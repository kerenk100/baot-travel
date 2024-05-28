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
} from "@mui/icons-material";

interface Trip {
  title: string;
  startDate: Date;
  endDate: Date;
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
    console.log("hiiiiiiiiiiiiiiiii");
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
            startDate: new Date(trip.startDate),
            endDate: new Date(trip.endDate),
            category: JSON.parse(trip.category),
          }));
          console.log("parsed trips ");
          console.log(parsedTrips);
          setTrips(parsedTrips);
        })
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      setEditingTrip({ ...editingTrip, [name]: value });
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
                      value={editingTrip?.startDate.toISOString().split("T")[0] || ""}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="endDate"
                      type="date"
                      value={editingTrip?.endDate.toISOString().split("T")[0] || ""}
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
                  <TableCell>{trip.startDate.toLocaleDateString()}</TableCell>
                  <TableCell>{trip.endDate.toLocaleDateString()}</TableCell>
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
                    <input
                      type="checkbox"
                      checked={trip.favorite}
                      onChange={() => handleFavorite(trip.id)}
                    />
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
