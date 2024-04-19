import './Map.css';
import { APIProvider, Map as GoogleMap, Marker} from '@vis.gl/react-google-maps';
import {MapInput} from './MapInput';
import React, { useState } from 'react';
import MapHandler from './MapHandler';
export interface MapProps{
    lng: number;
    lat: number;
}

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
function Map(props: MapProps) {
    const {lat, lng} = props;
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

    return (
        <APIProvider apiKey={API_KEY ?? ''}>
            <MapInput onPlaceSelect={setSelectedPlace} />
            <GoogleMap
                style={{width:'100%', height:'100%'}}
                defaultZoom={10}
                defaultCenter={{lat, lng}}
                disableDefaultUI={true}>
                <Marker position={selectedPlace?.geometry?.location} />
                <MapHandler place={selectedPlace}/>
            </GoogleMap>
        </APIProvider>)

}

export default Map;