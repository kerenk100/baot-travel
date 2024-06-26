import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trip } from "../types";
import { SuggestedTrips } from "./components/SuggestedTrips/SuggestedTrips";
import styles from "./ViewTrip.module.scss";
import { uwConfig } from "../../../components/utilities/uploadWidget/CloudinaryUploadWidget";
import { Chip, Divider } from "@mui/material";
import { formatDate } from "../TripsList";
import { APIProvider } from "@vis.gl/react-google-maps";
import TripMap from "../components/TripMap/TripMap";
import Weather from "../../../components/utilities/Weather/Weather";
import { Country } from "country-state-city";
import axios from "axios";

export default function ViewTrip() {
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const [city, setCity] = useState('');

  const { tripId } = useParams();

  const defineCityforWeather = (countryCode:string) =>{
    const countryName = Country.getCountryByCode(countryCode)?.name;
    if (countryName) { 
        axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(countryJSON => {
          if (countryJSON) setCity(countryJSON.data[0].capital[0]);
        });
    } 
  }
  
  useEffect(() => {
    fetch(`http://localhost:8080/trips/${tripId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(response => response.json()
        .then(json => {
          setTrip(json);
          if (json.country) defineCityforWeather(json.country);
      }))
      .finally(() => {
        setLoading(false);
      })
  }, [tripId])


   const img = (
    trip?.image ? <img
       src={
           trip?.image.startsWith("http")
             ? trip?.image
             : `https://res.cloudinary.com/${
                 uwConfig.cloudName
               }/image/upload/${encodeURIComponent(trip?.image)}`
       }
       alt={`${trip?.title} cover`}
     /> : <></>
   );

  if (loading) <p>Loading...</p>;
  if (!trip) return <p>Whoops something wen't wrong</p>;
  return (
    <div className={styles.columnContainer}>
      <div className={styles.title}>
            {trip.title && <span>{trip.title}</span>}{" "}
            {trip.country && (
              <span>{Country.getCountryByCode(trip.country)?.flag}</span>
            )}
          </div>
    <div className={styles.flexContainer}>
      <div className={styles.viewTrip}>
        
          <div className={styles.subtitle}>
            {trip.startDate && trip.endDate && (
              <div>
                {formatDate(trip.startDate)}-{formatDate(trip.endDate)}
              </div>
            )}
            {trip.tags && (
              <div className={styles.tags}>
                {trip.tags.map((tag) => (
                  <Chip size="small" key={tag} label={tag} />
                ))}
              </div>
            )}

            {!!trip.budget && (
              <>
                |<div className={styles.budget}>{trip.budget}$</div>
              </>
            )}
          </div>
          {img}
          {trip.description && <div className={styles.tripDescription}>{trip.description}</div>}
        
      </div>
      <div className={styles.locationInfo}>
      {city && <div className={styles.flexItem}>
          <Weather city={city}/>
        </div>}
        {trip?.country && <div className={(styles.flexItem, styles.map)}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY} >
          <TripMap trip={trip}/>
        </APIProvider>
      </div>}
      </div>
    </div>
    <Divider />
        {trip && <SuggestedTrips trip={trip} />}
    </div>
  );
}
