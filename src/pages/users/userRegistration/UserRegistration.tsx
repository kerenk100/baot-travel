import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import './UserRegistration.css';
import { validateEmail } from "../../../utils/validations";

interface UserRegistrationState {
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
    partnerSearch: string;
}

const UserRegistration = () => {
    const [user, setUser] = useState<UserRegistrationState>({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        address: "",
        city: "",
        country: "",
        password: "",
        errors: {},
        connectedUsers: [],
        partnerSearch: ""
    });

    const [isRegistered, setIsRegistered] = useState(false); // State to track registration success


    const handleChange = (prop: keyof UserRegistrationState) => (event: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [prop]: event.target.value });
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        const isValid = validateEmail(email);
        setUser({
            ...user,
            email,
            errors: { ...user.errors, email: isValid ? undefined : 'Email format is incorrect!' }
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user.errors.email) {
            console.error("Form submission blocked due to validation errors.");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/users/register', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    address: user.address,
                    city: user.city,
                    country: user.country,
                    password: user.password,
                    connectUsers: user.connectedUsers,
                    partnerSearch: user.partnerSearch
                })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    const errorMsg = await response.text();
                    setUser(prevState => ({
                        ...prevState,
                        errors: { ...prevState.errors, emailExists: 'Email already exists!' }
                    }));
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                setIsRegistered(true);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    if (isRegistered) {
        return <div className="registrationSuccess">
            <h2>Registration Succeeded!</h2>
            <p>Welcome, {user.firstName}!</p>
            <Button variant="contained" onClick={() => setIsRegistered(false)}>Go Back</Button>
        </div>;
    }


    const handleConnectedUsersChange = (event: ChangeEvent<HTMLInputElement>) => {
        const emails = event.target.value.split(',').map(email => email.trim()); // Split by comma and trim whitespace
        setUser({
            ...user,
            connectedUsers: emails
        });
    };

    const handlePartnerSearchChange = (event: SelectChangeEvent<string>) => {
        setUser({ ...user, partnerSearch: event.target.value });
    };

    return (
        <>
            <h3>User Registration</h3>
            <form className="registrationForm" onSubmit={handleSubmit}>
                <TextField id="firstName" label="First Name" variant="outlined" color="secondary"
                    value={user.firstName} onChange={handleChange('firstName')} required />
                <TextField id="lastName" label="Last Name" variant="outlined" color="secondary"
                    value={user.lastName} onChange={handleChange('lastName')} required />
                <TextField id="email" label="Email" variant="outlined" color="secondary" type="email"
                    value={user.email} error={!!user.errors.email || !!user.errors.emailExists}
                    helperText={user.errors.email || user.errors.emailExists}
                    onChange={handleEmailChange} required />
                <TextField id="dateOfBirth" label="Date of Birth" variant="outlined" color="secondary" type="date"
                    value={user.dateOfBirth} onChange={handleChange('dateOfBirth')} />
                <TextField id="address" label="Address" variant="outlined" color="secondary"
                    value={user.address} onChange={handleChange('address')} />
                <TextField id="city" label="City" variant="outlined" color="secondary"
                    value={user.city} onChange={handleChange('city')} />
                <TextField id="country" label="Country" variant="outlined" color="secondary"
                    value={user.country} onChange={handleChange('country')} />
                <TextField id="password" label="Password" variant="outlined" color="secondary" type="password"
                    value={user.password} onChange={handleChange('password')} required />
                <TextField id="connectedUsers" label="Connected Users emails" variant="outlined" color="secondary"
                    value={user.connectedUsers} onChange={handleConnectedUsersChange} />
                <InputLabel id="partnerSearch">Partner Search</InputLabel>
                <Select
                    id="partnerSearch"
                    label="Partner Search"
                    variant="outlined"
                    color="secondary"
                    value={user.partnerSearch}
                    onChange={handlePartnerSearchChange} // Added onChange handler
                >
                    <MenuItem value={"yes"}>Yes</MenuItem>
                    <MenuItem value={"no"}>No</MenuItem>
                </Select>
                <Button type="submit" variant="contained">Register</Button>
            </form>
        </>
    );
};
export default UserRegistration;