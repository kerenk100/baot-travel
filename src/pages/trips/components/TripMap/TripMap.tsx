"use client";
import { APIProvider, AdvancedMarker, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trip } from "../../types";
import { Country } from "country-state-city";
import Weather from "../../../../components/utilities/Weather/Weather";
import axios from "axios";
import { Container } from "@mui/material";
import styles from "./TripMap.module.scss"

const env = import.meta.env;
const API_KEY = env.VITE_GOOGLE_API_KEY;
const MAP_ID = env.VITE_TRIP_MAP_ID;

const TripMap = () => {
    const [coordinates, setCoordinates] = useState({lat:0, lng:0});
    const { tripId } = useParams();
    const [trip, setTrip] = useState<Trip | undefined>(undefined);
    const [city, setCity] = useState('');


  useEffect(() => {
    window.addEventListener('load', ()=> {
    fetch(`http://localhost:8080/trips/${tripId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json()
        .then(json => {
            setTrip(json);
            setMapToCountry(json.country);
        }))
      .finally(() => {
      })
    })
  }, [])

    async function setMapToCountry(countryCode:string){
        const countryName = Country.getCountryByCode(countryCode)?.name;
        if (!countryName) return;

        const countryJSON = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        if (countryJSON) setCity(countryJSON.data[0].capital[0]);

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: countryName }, (results, status) => {
          if (status === 'OK') {
            const location = results ? results[0].geometry.location : null;
            if (location)
            setCoordinates({ lat: location.lat(), lng: location.lng() });
          } else {
            console.error('Geocode was not successful for the following reason: ', status);
          }
        });
    }
    
  


return (
    <div className={styles.flexContainer}>
        <div className={styles.flexItem}>
          <Weather city={city || ''}/>
        </div>
        <div className={styles.flexItem}>
          <APIProvider apiKey={API_KEY ?? ''}>
          
              <GoogleMap
              mapId={MAP_ID}
              style={{width:'100%', height:'100%'}}
              defaultZoom={8}
              defaultCenter={coordinates}
              disableDefaultUI={true}
              center={coordinates}>
                  <AdvancedMarker position={{...coordinates}} />
              </GoogleMap>
          </APIProvider>
        </div>
    </div>);
  };

  export default TripMap;