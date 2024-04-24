import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './EditUser.css'; // You can style this component as needed

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
}

interface EditUserProps {
    match: {
        params: {
            userId: string;
        };
    };
}

const EditUser: React.FC<EditUserProps> = ({ match }) => {
    const [user, setUser] = useState<User>({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        address: "",
        city: "",
        country: "",
        password: "",
        errors: {}
    });

    useEffect(() => {
        // Fetch user data from backend using userId
        fetch(`http://localhost:3000/users/${match.params.userId}/edit`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [match.params.userId]);

    const handleChange = (prop: keyof User) => (event: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [prop]: event.target.value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Send updated user data to backend
        try {
            const response = await fetch(`http://localhost:3000/users/${match.params.userId}/edit`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                // Handle success
                console.log('User data updated successfully!');
            } else {
                // Handle error
                console.error('Failed to update user data');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <>
            <h3>Edit User Data</h3>
            <form className="editForm" onSubmit={handleSubmit}>
                {/* Render form fields similar to UserRegistration component */}
                {/* Use TextField components from Material-UI */}
                {/* Set value of each field to corresponding user property */}
                {/* Use handleChange function to update user state */}
                <TextField id="firstName" label="First Name" variant="outlined" color="secondary"
                    value={user.firstName} onChange={handleChange('firstName')} required />
                {/* Add other fields */}
                <Button type="submit" variant="contained">Update</Button>
            </form>
        </>
    );
};

export default EditUser;
