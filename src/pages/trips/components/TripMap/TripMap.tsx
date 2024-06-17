"use client";
import { AdvancedMarker, Map as GoogleMap } from "@vis.gl/react-google-maps";

import { useEffect, useState } from "react";
import { Trip } from "../../types";
import { Country } from "country-state-city";

const env = import.meta.env;
const MAP_ID = env.VITE_TRIP_MAP_ID;

export interface TripMapProps{
  trip:Trip
}
const TripMap:React.FC<TripMapProps> = ({trip}) => {
    const [coordinates, setCoordinates] = useState({lat:0, lng:0});

  useEffect(()=>{
    if(trip?.country){
      setMapToCountry(trip?.country)
    }
  },[trip])

    async function setMapToCountry(countryCode:string){
        const countryName = Country.getCountryByCode(countryCode)?.name;
        if (!countryName) return;

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
    <GoogleMap
    mapId={MAP_ID}
    style={{width:270, height:270}}
    defaultZoom={8}
    defaultCenter={coordinates}
    disableDefaultUI={true}
    fullscreenControl={true}
    center={coordinates}>
      <AdvancedMarker position={{...coordinates}} />
    </GoogleMap>);
  };

  export default TripMap;