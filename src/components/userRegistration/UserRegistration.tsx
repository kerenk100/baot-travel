import {TextField, Button} from '@mui/material';
import './UserRegistration.css';
import {ChangeEvent, useState} from 'react';
import {validateEmail} from "../../utils/validations.tsx";

const UserRegistration = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({})


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await fetch('http://localhost:5050/users/register', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                dateOfBirth,
                address,
                city,
                country,
                password
            })
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setDateOfBirth("");
        setAddress("");
        setCity("");
        setCountry("");
        setErrors({});
        setPassword("");
    }

    const handleEmailChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEmail(value);
        const isValid = validateEmail(value);
        setErrors({...errors, email: !isValid});
    };

    return (
        <>
            <h3>User Registration</h3>
            <form className="registrationForm">
                <TextField id="firstName"
                           label="First Name"
                           variant="outlined"
                           color="secondary"
                           value={firstName}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
                           required
                />
                <TextField id="lastName"
                           label="Last Name"
                           variant="outlined"
                           color="secondary"
                           value={lastName}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
                           required
                />
                <TextField id="email"
                           label="Email"
                           variant="outlined"
                           color="secondary"
                           type="email"
                           value={email}
                           error={errors?.email}
                           helperText={errors?.email ? 'Email format is incorrect!': ''}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => handleEmailChanged(event)}
                           required
                />
                <TextField id="dateOfBirth"
                           label="Date of Birth"
                           variant="outlined"
                           color="secondary"
                           type="date"
                           value={dateOfBirth}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setDateOfBirth(event.target.value)}
                           required
                />
                <TextField id="address"
                           label="Address"
                           variant="outlined"
                           color="secondary"
                           value={address}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
                           required
                />
                <TextField id="city"
                           label="City"
                           variant="outlined"
                           color="secondary"
                           value={city}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setCity(event.target.value)}
                           required
                />
                <TextField id="country"
                           label="Country"
                           variant="outlined"
                           color="secondary"
                           value={country}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setCountry(event.target.value)}
                           required
                />
                <TextField id="password"
                           label="Password"
                           variant="outlined"
                           color="secondary"
                           type="password"
                           value={password}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                           required
                />
                <Button variant="contained" onClick={handleSubmit}>Register</Button>
            </form>
        </>
    )
}

export default UserRegistration;
