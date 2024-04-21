import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button } from '@mui/material';
import './UserRegistration.css';
import { validateEmail } from "../../utils/validations";

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
    };
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
        errors: {}
    });

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
                    password: user.password
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                try {
                    const data = await response.text();
                    console.log("User registered successfully", data);
                    // Proceed with any follow-up actions
                } catch (error) {
                    throw new Error('Failed to parse JSON. ');
                }
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
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
                    value={user.email} error={!!user.errors.email} helperText={user.errors.email}
                    onChange={handleEmailChange} required />
                <TextField id="dateOfBirth" label="Date of Birth" variant="outlined" color="secondary" type="date"
                    value={user.dateOfBirth} onChange={handleChange('dateOfBirth')} required />
                <TextField id="address" label="Address" variant="outlined" color="secondary"
                    value={user.address} onChange={handleChange('address')} required />
                <TextField id="city" label="City" variant="outlined" color="secondary"
                    value={user.city} onChange={handleChange('city')} required />
                <TextField id="country" label="Country" variant="outlined" color="secondary"
                    value={user.country} onChange={handleChange('country')} required />
                <TextField id="password" label="Password" variant="outlined" color="secondary" type="password"
                    value={user.password} onChange={handleChange('password')} required />
                <Button type="submit" variant="contained">Register</Button>
            </form>
        </>
    );
};

export default UserRegistration;