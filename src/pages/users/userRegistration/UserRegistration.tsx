import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, SelectChangeEvent, Snackbar } from '@mui/material';
import './UserRegistration.css';
import { validateEmail } from "../../../utils/validations";
import { Link, useNavigate } from 'react-router-dom';
import { LocationFormItem } from '../../../components/utilities/formUtils/LocationFromItem/LocationFormItem';
import { position } from '@cloudinary/url-gen/qualifiers/timeline';
import { useAppContext } from '../../../App.context';



import CloudinaryUploadWidget from '../../../components/utilities/uploadWidget/CloudinaryUploadWidget';

interface UserFormState {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    address: string;
    city: string;
    country: string;
    password: string;
    phoneNumber: string;
    errors: {
        email?: string;
        emailExists?: string;
        phoneNumber?: string;
    };
    connectedUsers: string[];
    partnerSearch: string;
    image: string;
}

const UserForm = () => {
    const {user:systemUser} = useAppContext();
    const userId = systemUser?.id;
    
    const [user, setUser] = useState<UserFormState>({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        address: "",
        city: "",
        country: "",
        password: "",
        phoneNumber: "",
        errors: {},
        connectedUsers: [],
        partnerSearch: "",
        image: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState("This Snackbar will be dismissed in 5 seconds.");
    const [isFocused, setIsFocused] = useState(false);
    const [publicId, setPublicId] = useState("");

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    useEffect(() => {
        if (!userId) return;

        fetch(`http://localhost:8080/users/${userId}`)
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

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const phoneNumber = event.target.value;
        const isValid = /^\d+(-\d+)*$/.test(phoneNumber); // Validation for phone number
        setUser({
            ...user,
            phoneNumber,
            errors: { ...user.errors, phoneNumber: isValid ? undefined : 'Phone number format is incorrect!' }
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

        const isEmailValid = validateEmail(user.email);
        const isPhoneNumberValid = /^\d+(-\d+)*$/.test(user.phoneNumber);

        if (!isEmailValid || !isPhoneNumberValid) {
            setUser({
                ...user,
                errors: {
                    email: isEmailValid ? undefined : 'Email format is incorrect!',
                    phoneNumber: isPhoneNumberValid ? undefined : 'Phone number format is incorrect!'
                }
            });
            setSnackBarOpen(true);
            setSnackBarText("Please correct the errors before submitting.");
            return;
        }

        const endpoint = userId ? `http://localhost:8080/users/${userId}/edit` : 'http://localhost:8080/users/register';
        const method = userId ? "PUT" : "POST";
        if (publicId) {
            user.image = publicId;
        }
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
                if (resultText.toLowerCase().includes('user already exists')) {
                    setUser(prevState => ({
                        ...prevState,
                        errors: { ...prevState.errors, emailExists: 'Email already exists!' }
                    }));
                    setSnackBarOpen(true);
                    setSnackBarText("Ops! user already exists!");
                }
                throw new Error(resultText);
            }
            console.log('Success:', resultText);
            setIsSubmitted(true);
            setSnackBarOpen(true);
            setSnackBarText("The user was added successfully!");
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setSnackBarOpen(true);
            setSnackBarText("Error! There was a problem! Please try again");
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
            {publicId && (
                      <img
                        src={publicId.startsWith('http') ? publicId: `https://res.cloudinary.com/dwsypp6ma/image/upload/${encodeURIComponent(publicId)}`}
                        alt="bbb"
                        style={{ height: '100px', width: '150px', borderRadius: '5px' }}
                      />
                    )}
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={5000}
                onClose={() => { setSnackBarOpen(false); }}
                message={snackBarText}
                sx={{
                    position: 'static',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            />
            <form className="userForm" onSubmit={handleSubmit}>
                <TextField id="firstName" label="First Name" variant="outlined" color="secondary"
                    value={user.firstName} onChange={handleChange('firstName')} required className="formField" />
                <TextField id="lastName" label="Last Name" variant="outlined" color="secondary"
                    value={user.lastName} onChange={handleChange('lastName')} required className="formField" />
                {!userId && <TextField id="email" label="Email" variant="outlined" color="secondary" type="email"
                    value={user.email} error={!!user.errors.email || !!user.errors.emailExists}
                    helperText={user.errors.email || user.errors.emailExists}
                    onChange={handleEmailChange} required className="formField" />}
                <TextField
                    id="dateOfBirth"
                    label={isFocused ? "Date of Birth" : ""}
                    variant="outlined"
                    color="secondary"
                    type="date"
                    value={user.dateOfBirth}
                    onChange={handleChange('dateOfBirth')}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={isFocused ? "mm/dd/yyyy" : "Date of Birth"}
                    InputLabelProps={{
                        shrink: isFocused,
                    }}
                    className="formField"
                />
                <TextField id="address" label="Address" variant="outlined" color="secondary"
                    value={user.address} onChange={handleChange('address')} className="formField" />
                <TextField id="phoneNumber" label="Phone Number" variant="outlined" color="secondary"
                    value={user.phoneNumber} error={!!user.errors.phoneNumber}
                    helperText={user.errors.phoneNumber}
                    onChange={handlePhoneNumberChange} className="formField" />
                <LocationFormItem type='country' id='country' value={user.country} handleChange={handleChange('country')} className="formField" />
                <LocationFormItem type='city' id='city' value={user.city} handleChange={handleChange('city')} parentLocation={user.country} className="formField" />
                {!userId && <TextField id="password" label="Password" variant="outlined" color="secondary" type="password"
                    value={user.password} onChange={handleChange('password')} required className="formField" />}
                <TextField id="connectedUsers" label="Connected Users emails" variant="outlined" color="secondary"
                    value={user.connectedUsers} onChange={handleConnectedUsersChange} className="formField" />
                <InputLabel id="partnerSearch">Partner Search</InputLabel>
                <Select
                    id="partnerSearch"
                    label="Partner Search"
                    variant="outlined"
                    color="secondary"
                    value={user.partnerSearch}
                    onChange={handlePartnerSearchChange}
                    className="formField"
                >
                    <MenuItem value={"yes"}>Yes</MenuItem>
                    <MenuItem value={"no"}>No</MenuItem>
                </Select>
                <CloudinaryUploadWidget setPublicId={setPublicId}/>
                <Button type="submit" variant="contained" className="submitButton">{userId ? 'Update' : 'Register'}</Button>
            </form>
        </>
    );
};

export default UserForm;
