import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import './UserRegistration.css';
import { validateEmail } from "../../../utils/validations";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { LocationFormItem } from '../../../components/utilities/formUtils/LocationFromItem/LocationFormItem';

interface UserFormState {
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

const UserForm = () => {
    const [user, setUser] = useState<UserFormState>({
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

    const [isSubmitted, setIsSubmitted] = useState(false);
    const { userId } = useParams();
    const navigate = useNavigate();

    // Load user data if userId is present
    useEffect(() => {
        if (!userId) return;

        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [userId]);

    const handleChange = (prop: keyof UserFormState) => (event: ChangeEvent<HTMLInputElement>) => {
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

    const handleConnectedUsersChange = (event: ChangeEvent<HTMLInputElement>) => {
        const emails = event.target.value.split(',').map(email => email.trim());
        setUser({
            ...user,
            connectedUsers: emails
        });
    };

    const handlePartnerSearchChange = (event: SelectChangeEvent<string>) => {
        setUser({ ...user, partnerSearch: event.target.value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!userId && user.errors.email) {
            console.error("Form submission blocked due to validation errors.");
            return;
        }

        const endpoint = userId ? `http://localhost:3000/users/${userId}/edit` : 'http://localhost:3000/users/register';
        const method = userId ? "PUT" : "POST";

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const resultText = await response.text();
            if (!response.ok) {
                // Handling specific error based on the text response
                if (resultText.toLowerCase().includes('user already exists')) {
                    setUser(prevState => ({
                        ...prevState,
                        errors: { ...prevState.errors, emailExists: 'Email already exists!' }
                    }));
                }
                throw new Error(resultText); // Use the text from the response in the error
            }
            console.log('Success:', resultText);
            setIsSubmitted(true);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    if (isSubmitted) {
        const message = userId ? `Updated user, ${user.email}!` : `Welcome, ${user.firstName}!`;
        return <div className="userFormSuccess">
            <h2>{userId ? 'Updated User Succeeded!' : 'Registration Succeeded!'}</h2>
            <p>{message}</p>
            <Button variant="contained" onClick={() => navigate('/')}>Go Back</Button>
            {!userId && <Link to="/login">LOGIN</Link>}
        </div>;
    }

    return (
        <>
            <h3>{userId ? 'Edit User Data' : 'User Registration'}</h3>
            <form className="userForm" onSubmit={handleSubmit}>
                {/* Common form fields for registration and edit */}
                <TextField id="firstName" label="First Name" variant="outlined" color="secondary"
                    value={user.firstName} onChange={handleChange('firstName')} required />
                <TextField id="lastName" label="Last Name" variant="outlined" color="secondary"
                    value={user.lastName} onChange={handleChange('lastName')} required />
                { !userId && <TextField id="email" label="Email" variant="outlined" color="secondary" type="email"
                    value={user.email} error={!!user.errors.email || !!user.errors.emailExists}
                    helperText={user.errors.email || user.errors.emailExists}
                    onChange={handleEmailChange} required />}
                <TextField id="dateOfBirth" label="Date of Birth" variant="outlined" color="secondary" type="date"
                    value={user.dateOfBirth} onChange={handleChange('dateOfBirth')} />
                <TextField id="address" label="Address" variant="outlined" color="secondary"
                    value={user.address} onChange={handleChange('address')} />
                <LocationFormItem type='country' id='country' value={user.country} handleChange={handleChange('country')}/>
                <LocationFormItem type='city' id='city' value={user.city} handleChange={handleChange('city')} parentLocation={user.country}/>
                { !userId && <TextField id="password" label="Password" variant="outlined" color="secondary" type="password"
                    value={user.password} onChange={handleChange('password')} required />}
                <TextField id="connectedUsers" label="Connected Users emails" variant="outlined" color="secondary"
                    value={user.connectedUsers} onChange={handleConnectedUsersChange} />
                <InputLabel id="partnerSearch">Partner Search</InputLabel>
                <Select
                    id="partnerSearch"
                    label="Partner Search"
                    variant="outlined"
                    color="secondary"
                    value={user.partnerSearch}
                    onChange={handlePartnerSearchChange}
                >
                    <MenuItem value={"yes"}>Yes</MenuItem>
                    <MenuItem value={"no"}>No</MenuItem>
                </Select>
                <Button type="submit" variant="contained">{userId ? 'Update' : 'Register'}</Button>
            </form>
        </>
    );
};

export default UserForm;