import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trip } from "../types";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";

const uwConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET || ''
}

export default function ViewTrip() {
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState<Trip | undefined>(undefined);

  const { tripId } = useParams();

  const boxSx = { margin: '10px' };

  const cld = new Cloudinary({
    cloud: {
      cloudName: uwConfig.cloudName
    }
  });
  
  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:8080/trips/${tripId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json()
        .then(json => setTrip(json)))
      .finally(() => {
        setLoading(false);
      })
  }, [])

  const image = cld.image(trip?.image);

  return (
    <div>
      <header className="App-header">
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
      </header>
    </div>)
} 