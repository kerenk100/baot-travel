import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './EditUser.css'; // You can style this component as needed
import { useParams } from 'react-router-dom';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    address: string;
    city: string;
    country: string;
    password: string;
    errors: {
        email?: string;
        emailExists?: string;
    };
    connectedUsers: string[];
}


const EditUser = () => {
    const [user, setUser] = useState<User>({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        address: "",
        city: "",
        country: "",
        password: "",
        errors: {},
        connectedUsers: []
    });

    const [isUpdatedUser, setIsUpdatedUser] = useState<boolean | undefined>(undefined); // State to track registration success

    const { userId } = useParams();

    useEffect(() => {
        // Fetch user data from backend using userId
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [userId]);

    const handleChange = (prop: keyof User) => (event: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [prop]: event.target.value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Send updated user data to backend
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}/edit`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                // Handle success
                console.log('User data updated successfully!');
                setIsUpdatedUser(true);
            } else {
                // Handle error
                console.error('Failed to update user data');
                setIsUpdatedUser(false);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    if (isUpdatedUser == undefined) {
        return (
            <>
                <h3>Edit User Data</h3>
                <form className="editForm" onSubmit={handleSubmit}>
                    {/* Render form fields similar to UserRegistration component */}
                    {/* Use TextField components from Material-UI */}
                    {/* Set value of each field to corresponding user property */}
                    {/* Use handleChange function to update user state */}
                    <TextField id="firstName" label="First Name" variant="outlined" color="secondary"
                        value={user.firstName} onChange={handleChange('firstName')} />
                    <TextField id="lastName" label="Last Name" variant="outlined" color="secondary"
                        value={user.lastName} onChange={handleChange('lastName')}/>
                    <TextField id="dateOfBirth" label="Date of birth" variant="outlined" color="secondary"
                        value={user.dateOfBirth} onChange={handleChange('dateOfBirth')}/>
                    <TextField id="address" label="Address" variant="outlined" color="secondary"
                        value={user.address} onChange={handleChange('address')}/>
                    <TextField id="city" label="City" variant="outlined" color="secondary"
                        value={user.city} onChange={handleChange('city')}/>
                    <TextField id="country" label="Country" variant="outlined" color="secondary"
                        value={user.country} onChange={handleChange('country')}/>
                    <TextField id="connectedUsers" label="Connected Users" variant="outlined" color="secondary"
                        value={user.connectedUsers} onChange={handleChange('connectedUsers')}/>
                    <Button type="submit" variant="contained">Update</Button>
                </form>
            </>
        );
    }
    else if (isUpdatedUser == true) {
        return <div className="updateUserSuccess">
            <h2>Updated User Succeeded!</h2>
            <p>Updated user, {user.email}!</p>
            <Button variant="contained" onClick={() => setIsUpdatedUser(undefined)}>Go Back</Button>
        </div>;
    }
    else {
        return <div className="updateUserSuccess">
        <h2>Failed to update user data</h2>
        <p>Failed to update user {user.email}!</p>
        <Button variant="contained" onClick={() => setIsUpdatedUser(undefined)}>Go Back</Button>
    </div>;
    }
    
    
};

export default EditUser;
