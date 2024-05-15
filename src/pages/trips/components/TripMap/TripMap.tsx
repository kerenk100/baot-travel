"use client";
import { APIProvider, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";

import { useEffect, useState } from "react";
//import MapHandler from "../../../../components/utilities/MapHandler";


const API_KEY = 'AIzaSyAlTkWRVa1CelacI3DAKKCO6OLkfrvfFME';//import.meta.env.VITE_GOOGLE_API_KEY;

const TripMap = (props:{location : string} ) => {
    const location = props.location;
    const [coordinates, setCoordinates] = useState({lat:0, lng:0});
    
    //const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    
    window.addEventListener('load', ()=> {

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === 'OK') {
            const location = results ? results[0].geometry.location : null;
            if (location)
            setCoordinates({ lat: location.lat(), lng: location.lng() });
          } else {
            console.error('Geocode was not successful for the following reason: ', status);
          }
        });
      });
    
  


return (
    <APIProvider apiKey={API_KEY ?? ''}>
        <GoogleMap
        style={{width:'100%', height:'100%'}}
        defaultZoom={8}
        defaultCenter={coordinates}
        disableDefaultUI={true}
        center={coordinates}>
    </GoogleMap>
    </APIProvider>);
  };

  export default TripMap;