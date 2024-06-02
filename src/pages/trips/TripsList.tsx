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

interface Trip {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  category: string[];
  description: string;
  image: string;
  budget: number;
  destination: string;
  id: string;
  favorite: boolean;
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
            startDate: parseDate(trip.startDate),
            endDate: parseDate(trip.endDate),
            category: JSON.parse(trip.category),
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
    const tripToEdit = trips.find((trip) => trip.id === tripId);
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

  const handleDelete = (tripId: string) => {
    setTrips(trips.filter((trip) => trip.id !== tripId));
  };

  const handleFavorite = (tripId: string) => {
    setTrips(
      trips.map((trip) =>
        trip.id === tripId ? { ...trip, favorite: !trip.favorite } : trip
      )
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().split("T")[0] : "";
  };

  return (
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
                      name="category"
                      value={editingTrip?.category.join(", ") || ""}
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
                  <TableCell>{trip.startDate?.toLocaleDateString()}</TableCell>
                  <TableCell>{trip.endDate?.toLocaleDateString()}</TableCell>
                  <TableCell>{trip.category.join(", ")}</TableCell>
                  <TableCell>{trip.description}</TableCell>
                  <TableCell>{trip.budget}</TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(trip.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(trip.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleFavorite(trip.id)}>
                      {trip.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
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
  );
};

export default TripsList;
