import { useEffect, useState } from "react";
import { Trip } from "../../../types";
import { useParams } from "react-router-dom";
import styles from "./SuggestedTrips.module.scss";
import { SuggestedTrip } from "./SuggestedTrip/SuggestedTrip";

export interface SuggestedTripsProps {
  trip: Trip;
}

export const SuggestedTrips: React.FC<SuggestedTripsProps> = (props) => {
  const { trip } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [suggestions, setSuggestions] = useState<Trip[]>([
    {
      _id: "1,",
      budget: 300,
      country: "USA",
      description: "yay",
      endDate: "2020/03/29",
      image: "",
      isPublic: true,
      startDate: "2020/02/29",
      tags: ["Family"],
      title: "Week in Las Vegas with my family",
      owner:"123",
    },
  ]);
  const { tripId } = useParams();
  
  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:8080/trips/${tripId}/suggested_trips`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json().then((json) => setSuggestions(json)))
      .finally(() => {
        setLoading(false);
      });
  }, [trip]);

  return loading ? (
    <>Loading...</>
  ) : (
    <>
      <p>Suggested for you:</p>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion) => (
          <SuggestedTrip key={suggestion._id} {...suggestion} />
        ))}
      </div>
    </>
  );
};
