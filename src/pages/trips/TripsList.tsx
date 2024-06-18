import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { Trip } from "./types";

export interface TripsListProps {
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  handleRemoveLike: (trip: Trip) => void;
  loading: boolean;
}
export const formatDate = (date: string | null) => {
  return date?.replaceAll("-", "/");
};

const TripsList: React.FC<TripsListProps> = ({
  trips,
  setTrips,
  handleRemoveLike,
}) => {
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [snackBarProps, setSnackBarProps] = useState({open:false, message:""});
  let userId = null;
  const user = localStorage.getItem("user");
  if (user) {
    userId = JSON.parse(user).id;
  }

  const handleEdit = (tripId: string) => {
    const tripToEdit = trips.find((trip) => trip._id === tripId);
    if (tripToEdit) {
      setEditingTripId(tripId);
      setEditingTrip({ ...tripToEdit });
    }
  };

  const updateTrip = async (tripToUpdate: Trip) => {
    try {
      await fetch(
        `http://localhost:8080/trips/${tripToUpdate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tripToUpdate),
        }
      );
      setTrips((prevTrips) => {
        return prevTrips.map((tripItem) => {
          return tripItem._id === tripToUpdate._id ? tripToUpdate : tripItem;
        });
      });
    } catch (error: unknown) {
      console.log(error);
    }
  };
  const handleSave = () => {
    if (editingTripId && editingTrip) {
      updateTrip(editingTrip)
      setEditingTripId(null);
      setEditingTrip(null);
      setSnackBarProps({open:true, message:"Trip Updated!"})
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

      if (name === "tags") {
        newValue = value.split(",");
      }

      setEditingTrip({ ...editingTrip, [name]: newValue });
    }
  };

  const handleViewTrip = (tripId: string) => {
    navigate(`/trips/${tripId}`);
  };

  const isCurrentUserIsOwner = (trip: Trip) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user != null && trip.owner === user.id;
  };

  const handleDelete = (tripId: string) => {
    setTrips(trips.filter((trip) => trip._id !== tripId));
    deleteTrip(tripId);
  };

  const deleteTrip = async (id: string) => {
    try {
      // Send DELETE request to the server
      const response = await fetch(`http://localhost:8080/trips/${id}`, {
        method: "DELETE",
      });

      // Check if the DELETE was actually successful
      if (!response.ok) {
        // If the DELETE was not successful, handle the error
        const message = await response.text(); // or response.json() if the server sends JSON
        console.error(`Failed to delete trip: ${message}`);
        throw new Error(message); // Re-throw to handle it outside or for further error handling logic
      } else {
        setTrips(trips.filter((trip) => trip._id !== id));
        console.log(`Trip deleted successfully with ID: ${id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error making DELETE request:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleFavoriteChanged = async (trip: Trip) => {
    const isAddedToWishList: boolean = !!trip.wishId;
    if(!userId){
      setSnackBarProps({open:true, message:"Login to like trip"})
    }

    try {
      if (isAddedToWishList) {
        await fetch(`http://localhost:8080/wishlist/${trip.wishId}`, {
          method: "DELETE",
        }).then(() => handleRemoveLike(trip));
      } else {
        await fetch(`http://localhost:8080/wishlist/${trip._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(userId ? { authorization: userId } : {}),
          },
        }).then((response) =>
          response.json().then((json) => {
            setTrips((prevTrips) => {
              return prevTrips.map((tripItem) => {
                return trip._id === tripItem._id
                  ? { ...trip, wishId: json }
                  : tripItem;
              });
            });
          })
        );
      }
    } catch (error) {
      console.log("Failed to like a trip");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackBarProps({open:false, message:""})
  };

  const navigate = useNavigate();
  return (
    <TableContainer>
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
            <TableRow key={trip._id}>
              {editingTripId === trip._id ? (
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
                      value={editingTrip?.startDate}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="endDate"
                      type="date"
                      value={editingTrip?.endDate}
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
                      name="country"
                      value={editingTrip?.country || ""}
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
                  <TableCell>{formatDate(trip.startDate)}</TableCell>
                  <TableCell>{formatDate(trip.endDate)}</TableCell>
                  <TableCell>{trip?.tags?.join(", ")}</TableCell>
                  <TableCell>
                    {trip.description && trip.description.length > 50
                      ? trip.description.substring(0, 50) + "..."
                      : trip.description}
                  </TableCell>
                  <TableCell>{trip.budget}</TableCell>
                  <TableCell>{trip.country}</TableCell>
                  <TableCell>
                    {isCurrentUserIsOwner(trip) && (
                      <IconButton onClick={() => handleEdit(trip._id)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    {isCurrentUserIsOwner(trip) && (
                      <IconButton onClick={() => handleDelete(trip._id)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                    {!isCurrentUserIsOwner(trip) && (
                      <IconButton onClick={() => handleFavoriteChanged(trip)}>
                        {!!trip.wishId ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleViewTrip(trip._id)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
      {...snackBarProps}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
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
