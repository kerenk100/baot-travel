import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  TextField,
  Box,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Routes } from "../../routes/routes";
import { useNavigate } from "react-router-dom";

interface Trip {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  tags: [],
  description: string;
  image: string;
  budget: number;
  destination: string;
  id: string;
  favorite: boolean;
  owner: string
}

const TripsList: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/trips", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) =>
        response.json().then((json) => {
          const parsedTrips = json.map((trip: any) => ({
            ...trip,
          }));
          setTrips(parsedTrips);
        })
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const parseDate = (dateString: string): Date | null => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // months are 0-based in JavaScript
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  const handleEdit = (tripId: string) => {
    const tripToEdit = trips.find((trip) => trip._id === tripId);
    if (tripToEdit) {
      setEditingTripId(tripId);
      setEditingTrip({ ...tripToEdit });
    }
  };

  const handleSave = () => {
    if (editingTripId && editingTrip) {
      setTrips(
        trips.map((trip) =>
          trip.id === editingTripId ? editingTrip : trip
        )
      );
      setEditingTripId(null);
      setEditingTrip(null);
      setOpenSnackbar(true);
    }
  };

  const handleCancel = () => {
    setEditingTripId(null);
    setEditingTrip(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingTrip) {
      const { name, value } = e.target;
      let newValue: any = value;

      if (name === "startDate" || name === "endDate") {
        newValue = new Date(value);
      }

      setEditingTrip({ ...editingTrip, [name]: newValue });
    }
  };

  const handleViewTrip = (tripId: string, tags:[]) => {
    console.log(tripId);
    console.log(tags);
    navigate(`/trips/${tripId}`);
  };

  const hasEditPermission = (trip: Trip) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user != null && trip.owner === user.id;
  }

  const handleDelete = (tripId: string) => {
    setTrips(trips.filter((trip) => trip._id !== tripId));
  };

  // const handleFavorite = (tripId: string) => {
  //   setTrips(
  //       trips.map((trip) =>
  //           trip.id === tripId ? { ...trip, favorite: !trip.favorite } : trip
  //       )
  //   );
  // };

  const handleFavoriteChanged = async (tripId: string) => {

    const selectedTrip: Trip = trips.filter(trip => trip.id === tripId)[0];
    const isAddedToWishList: boolean = !selectedTrip.favorite;

    setTrips(
      trips.map((trip) =>
        trip.id === tripId ? { ...trip, favorite: isAddedToWishList } : trip
      )
    );

    console.log(selectedTrip);
    console.log(tripId);

    if (isAddedToWishList) {
      await fetch('http://localhost:8080/wishlist', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedTrip)
      });
    } else {
      await fetch(`http://localhost:8080/wishlist/${tripId}`, { //TODO: Fix the id issue... currently it sends undefined and fails.
        method: 'DELETE'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().split("T")[0] : "";
  };

const navigate = useNavigate();
  return (
        <Box sx={{ width: "100%" }}>
      <button onClick={() => navigate(Routes.TRIPS_ADD_TRIP)}>Add new trip</button>
      <Paper sx={{ width: "100%", mb: 2 }}>
       
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              {editingTripId === trip.id ? (
                <>
                  <TableCell>
                    <TextField
                      name="title"
                      value={editingTrip?.title || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="startDate"
                      type="date"
                      value={formatDate(editingTrip?.startDate)}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="endDate"
                      type="date"
                      value={formatDate(editingTrip?.endDate)}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="tags"
                      value={editingTrip?.tags || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="description"
                      value={editingTrip?.description || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="budget"
                      type="number"
                      value={editingTrip?.budget || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="destination"
                      value={editingTrip?.destination || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancel}>
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{trip.title}</TableCell>
                  <TableCell>{trip.startDate}</TableCell>
                  <TableCell>{trip.endDate}</TableCell>
                  <TableCell>{trip?.tags?.join(', ')}</TableCell>
                  <TableCell>{trip.description && trip.description.substring(0, 50)+"..."}</TableCell>
                  <TableCell>{trip.budget}</TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>
                    {hasEditPermission(trip) && <IconButton onClick={() => handleEdit(trip._id)}>
                      <EditIcon />
                    </IconButton>}
                    {hasEditPermission(trip) && <IconButton onClick={() =>handleDelete(trip._id)}>
                      <DeleteIcon />
                    </IconButton>}
                    <IconButton onClick={() => handleFavoriteChanged(trip.id)}>
                      {trip.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton  onClick={() => handleViewTrip(trip._id,trip.tags)}>< VisibilityIcon /></IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Trip updated"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </TableContainer>
    </Paper>
    </Box>
  );
};

export default TripsList;
