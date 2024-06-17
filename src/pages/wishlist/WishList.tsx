import React, { useEffect, useState } from 'react';
import TripsList from '../trips/TripsList.tsx';
import { Trip } from '../trips/types.ts';

const WishList: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);

    const [loading, setLoading] = useState(false);
    let userId = null
    const user =  localStorage.getItem("user")
    if (user){
      userId = JSON.parse(user).id
    }


    const fetchData =async()=>{
      setLoading(true);
      try{
        const res = await fetch("http://localhost:8080/wishlist/trips", {
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

    const handleRemoveLike=(trip:Trip)=>{
      setTrips((prevTrips)=>{
        return prevTrips.filter((tripItem)=>tripItem._id!==trip._id)
      })
    }

    return (
        <>
            <h1>My WishList </h1>
            <TripsList trips={trips} setTrips={setTrips} loading={loading} handleRemoveLike={handleRemoveLike}/>
        </>
    );
};

export default WishList;
