import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trip } from "../types";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { APIProvider } from "@vis.gl/react-google-maps";
import TripMap from "../components/TripMap/TripMap";
import styles from "./ViewTrip.module.scss"
import Weather from "../../../components/utilities/Weather/Weather";
import { Country } from "country-state-city";
import axios from "axios";

const uwConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET || ''
}



export default function ViewTrip() {
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const [city, setCity] = useState('');

  const { tripId } = useParams();
  const boxSx = { margin: '10px' };
  const cld = new Cloudinary({
    cloud: {
      cloudName: uwConfig.cloudName
    }
  });

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
    setLoading(true)
    fetch(`http://localhost:8080/trips/${tripId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json()
        .then(json => {
          setTrip(json);
          if (json.country) defineCityforWeather(json.country);
      }))
      .finally(() => {
        setLoading(false);
      })
  }, [trip])

  const image = cld.image(trip?.image);

  return (
    <div className={styles.flexContainer}>
      <div className={styles.flexItem}>
        <Box sx={boxSx}>
          <Typography variant="h6">Trip name:</Typography>
          <Typography>{trip?.title}</Typography>
        </Box>
        <Box sx={boxSx}>
          <Typography variant="h6">Description:</Typography>
          <Typography>{trip?.description}</Typography>
        </Box>
        <Box sx={boxSx}>
          <Typography variant="h6">Country:</Typography>
          <Typography>{trip?.country}</Typography>
        </Box>
        <Box sx={boxSx}>
          <Typography variant="h6">Tags:</Typography>
          <Typography>{trip?.tags?.join(', ')}</Typography>
        </Box>
        <Box sx={boxSx}>
          <Typography variant="h6">Is public post?</Typography>
          <Typography>{trip?.isPublic}</Typography>
        </Box>
        <Box sx={boxSx}>
          <Typography variant="h6">Budget:</Typography>
          <Typography>{trip?.budget}</Typography>
        </Box>
        <Box sx={boxSx}>
          <Typography variant="h6">Start date:</Typography>
          <Typography>{trip?.startDate}</Typography>
        </Box>
        <Box sx={boxSx}>
          <Typography variant="h6">End date:</Typography>
          <Typography>{trip?.endDate}</Typography>
        </Box>
        <Box sx={boxSx}>
          <Typography variant="h6">Pictures:</Typography>
          <AdvancedImage
            style={{ maxWidth: "100px" }}
            cldImg={image}
            plugins={[responsive(), placeholder()]}
          />
        </Box>
      </div>
      <div className={styles.flexItem}>
          <Weather city={city || ''}/>
        </div>
      <div className={styles.flexItem}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY} >
          <TripMap ></TripMap>
        </APIProvider>
      </div>
    </div>)
} 