import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trip } from "../types";
import { TripField } from "./components/TripField";
import { SuggestedTrips } from "./components/SuggestedTrips/SuggestedTrips";

export default function ViewTrip() {
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState<Trip | undefined>(undefined);

  const { tripId } = useParams();

  const boxSx = { margin: "10px" };

  useEffect(() => {
    fetch(`http://localhost:8080/trips/${tripId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json().then((json) => setTrip(json)))
      .finally(() => {
        setLoading(false);
      });
  }, [tripId]);
  
  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <Box sx={boxSx}>
        {trip &&
          Object.keys(trip).map((key) => {
            return <TripField tripKey={key} trip={trip} key={key} />;
          })}
      </Box>
      {trip && <SuggestedTrips trip={trip} />}
    </div>
  );
}