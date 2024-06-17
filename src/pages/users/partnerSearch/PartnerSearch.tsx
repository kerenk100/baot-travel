// PartnerSearch.tsx
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button, CircularProgress, Snackbar
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const PartnerSearch: React.FC = () => {
  const [partnerUsers, setPartnerUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchPartnerUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/users/partners-search');
      if (!response.ok) {
        throw new Error(`Failed to fetch partner users! Status: ${response.status}`);
      }
      const partnerUsersData: User[] = await response.json();
      console.log("Fetched data:", partnerUsersData);  // Debugging line
      setPartnerUsers(partnerUsersData);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching partner users:', error);  // More detailed error log
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerUsers();
  }, []);

  const handleDelete = (index: number) => {
    const updatedUsers = [...partnerUsers];
    updatedUsers.splice(index, 1);
    setPartnerUsers(updatedUsers);
  };

  const handleAddEmail = () => {
    if (newEmail.trim() === '') {
      setSnackbarOpen(true);
      setSnackbarMessage('Email cannot be empty!');
      return;
    }
    const newUser: User = { firstName: '', lastName: '', email: newEmail };
    setPartnerUsers([...partnerUsers, newUser]);
    setNewEmail('');
    setSnackbarOpen(true);
    setSnackbarMessage('Email added successfully!');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <div>
      <h1>Potential Travel Partners</h1>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partnerUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default PartnerSearch;
