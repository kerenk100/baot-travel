import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { Routes } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import TripsList from "./TripsList";
import { Trip } from "./types";

const TripsPage: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading]=useState(false)
    let userId = null
    const user =  localStorage.getItem("user")
    if (user){
      userId = JSON.parse(user).id
    }
    const fetchData =async()=>{
      setLoading(true);
      try{
        const res = await fetch("http://localhost:8080/trips", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            ...userId ? {"authorization":userId} : {}
          },
        })
        const trips = await res.json() as Trip[]
        setTrips(trips);
    }catch(error: unknown){
      console.log(error)
    }finally{
          setLoading(false);
        }
    }

    useEffect(() => {
      fetchData()
      }, []);

  const navigate = useNavigate();
  const handleRemoveLike =(trip:Trip)=>{
     setTrips((prevTrips)=>{
              return prevTrips.map((tripItem)=>{
                return trip._id === tripItem._id ? { ...trip, wishId: null } : tripItem
              })
            })
  }
  return (
    <Box sx={{ width: "100%" }}>
      <button onClick={() => navigate(Routes.TRIPS_ADD_TRIP)}>
        Add new trip
      </button>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TripsList trips={trips} setTrips={setTrips} loading={loading} handleRemoveLike={handleRemoveLike}/>
      </Paper>
    </Box>
  );
};

export default TripsPage;
