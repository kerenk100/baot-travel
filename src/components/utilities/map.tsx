import { APIProvider, Map as GoogleMap, Marker} from '@vis.gl/react-google-maps';
export interface MapProps{
    lng: number;
    lat: number;
}

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
function Map(props: MapProps) {
    const {lat, lng} = props;
    let location = {
        lat, lng
    };

    return (
        <APIProvider apiKey={API_KEY ?? ''}>
            <GoogleMap
                style={{width:'100%', height:'100%'}}
                defaultZoom={10}
                defaultCenter={location}
                disableDefaultUI={true}>
                <Marker position={location} />
            </GoogleMap>
        </APIProvider>)

}

export default Map;