// PartnerSearch.tsx
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button, CircularProgress, Snackbar
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface PartnerSearchState {
  partnerUsers: User[];
  isLoading: boolean;
  error: string | null;
  newEmail: string;
  snackbarOpen: boolean;
  snackbarMessage: string;
}

interface PartnerSearchProps {}

class PartnerSearch extends React.Component<PartnerSearchProps, PartnerSearchState> {
  constructor(props: PartnerSearchProps) {
    super(props);
    this.state = {
      partnerUsers: [],
      isLoading: false,
      error: null,
      newEmail: '',
      snackbarOpen: false,
      snackbarMessage: ''
      };
    }

    fetchPartnerUsers = async () => {
        this.setState({ isLoading: true, error: null });
        try {
            const response = await fetch('http://localhost:8080/users/partners-search');
            if (!response.ok) {
                throw new Error(`Failed to fetch partner users! Status: ${response.status}`);
            }
            const partnerUsersData: User[] = await response.json();
            console.log("Fetched data:", partnerUsersData);  // Debugging line
            this.setState({ partnerUsers: partnerUsersData, isLoading: false });
        } catch (error: any) {
            console.error('Error fetching partner users:', error);  // More detailed error log
            this.setState({ error: error.message, isLoading: false });
        }
    };


  componentDidMount() {
    this.fetchPartnerUsers();
  };

  handleDelete = (index: number) => {
    const updatedUsers = [...this.state.partnerUsers];
    updatedUsers.splice(index, 1);
    this.setState({ partnerUsers: updatedUsers });
  };

  handleAddEmail = () => {
    const { newEmail, partnerUsers } = this.state;
    if (newEmail.trim() === '') {
      this.setState({ snackbarOpen: true, snackbarMessage: 'Email cannot be empty!' });
      return;
    }
    const newUser: User = { firstName: '', lastName: '', email: newEmail };
    this.setState({
      partnerUsers: [...partnerUsers, newUser],
      newEmail: '',
      snackbarOpen: true,
      snackbarMessage: 'Email added successfully!',
    });
  };

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newEmail: e.target.value });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false, snackbarMessage: '' });
  };

  render() {
    const { partnerUsers, isLoading, error, newEmail, snackbarOpen, snackbarMessage } = this.state;

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
                      <IconButton onClick={() => this.handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <TextField
                      value={newEmail}
                      onChange={this.handleEmailChange}
                      placeholder="Enter new email"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={this.handleAddEmail}
                    >
                      Add Email
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          message={snackbarMessage}
          action={
            <IconButton size="small" color="inherit" onClick={this.handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    );
  };
}

export default PartnerSearch;
