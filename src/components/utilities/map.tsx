import React from 'react';

import { APIProvider, Map as GoogleMap, Marker} from '@vis.gl/react-google-maps';
export interface MapProps{
    lng: number;
    lat: number;
}

const API_KEY = 'AIzaSyDxrwyU3JroCD11yhG5iBU8bSpKAO4uY0k';
function Map(props: MapProps) {
    const {lat, lng} = props;
    let location = {
        lat, lng
    };

    return (
        <APIProvider apiKey={API_KEY}>
            <GoogleMap
                style={{width:'100%', height:'100%'}}
                defaultZoom={10}
                center={location}
                disableDefaultUI={true}>
                <Marker position={location} />
            </GoogleMap>
        </APIProvider>)

}

export default Map;