import { Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

export default function BasicTable() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8080/trips', {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    .then(response => response.json()
    .then(json => setTrips(json)))
    .finally(()=>{
      setLoading(false);
    })
  },[])

  return (
    <div className="App">
    { loading ? (
        <div>loading...</div>
        ) : ( 
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Destination</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{trip.title}</TableCell>
              <TableCell align="right">{trip.description}</TableCell>
              <TableCell align="right">{trip.destination}</TableCell>
              <TableCell align="right">{trip.category}</TableCell>
              <TableCell align="right">{trip.startDate}</TableCell>
              <TableCell align="right">{trip.endDate}</TableCell>
              <TableCell align="right">{trip.budget}</TableCell>
              <TableCell align="right">{trip.image}</TableCell>
               
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
  </div>
  )
}