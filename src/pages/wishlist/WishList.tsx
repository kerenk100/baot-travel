import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Snackbar
} from "@mui/material";
import {
    Delete as DeleteIcon,
    Close as CloseIcon
} from "@mui/icons-material";
import {parseDate} from "../../utils/dateParser.tsx";

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

const WISHLIST_TABLE_COLUMNS:  { title: string; field: string; } [] = [
    { title: 'Title', field: 'title'},
    { title: 'Start Date', field: 'startDate'},
    { title: 'End Date', field: 'endDate'},
    { title: 'Category', field: 'category'},
    { title: 'Description', field: 'description'},
    { title: 'Budget', field: 'budget'},
    { title: 'Destination', field: 'destination'}
    ];


const WishList: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/wishlist", {
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
                        category: trip.category,
                    }));
                    setTrips(parsedTrips);
                })
            )
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const handleDelete = async (tripId: string) => {
        console.log('tripID', tripId)
        await fetch(`http://localhost:8080/wishlist/${tripId}`, {
            method: 'DELETE'
        }).then(() => setOpenSnackbar(true));
        // setTrips(trips.filter((trip) => trip.id !== tripId));
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <h1>My WishList </h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow key='columns'>
                            {WISHLIST_TABLE_COLUMNS.map(column =>
                                <TableCell key={column.title}>{column.title}</TableCell>
                            )}
                            <TableCell key='actions'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trips.map((trip) => (
                            <TableRow key={trip.id}>
                                <TableCell key={trip.id+'title'}>{trip.title}</TableCell>
                                <TableCell key={trip.id+'startDate'}>{trip.startDate?.toLocaleDateString()}</TableCell>
                                <TableCell key={trip.id+'endDate'}>{trip.endDate?.toLocaleDateString()}</TableCell>
                                <TableCell key={trip.id+'category'}>{trip.category.join(", ")}</TableCell>
                                <TableCell key={trip.id+'description'}>{trip.description}</TableCell>
                                <TableCell key={trip.id+'budget'}>{trip.budget}</TableCell>
                                <TableCell key={trip.id+'destination'}>{trip.destination}</TableCell>
                                <TableCell key={trip.id+'action'}>
                                    <IconButton onClick={()=>handleDelete(trip.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message="Wishlist updated"
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
        </>
    );
};

export default WishList;
