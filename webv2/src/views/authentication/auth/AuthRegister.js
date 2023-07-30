import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Stack } from '@mui/system';
import CustomTextField from '../../../components/shared/CustomTextField';
import authService from 'src/services/auth.service';
import Snackbar from '@mui/material/Snackbar';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const navigate = useNavigate();
    const [state , setState] = useState({
        username : "",
        email: "",
        password : ""
    })
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const handleSnackbarClose = (event, reason) => {
        setShowSnackbar(false);
    };

    const handleChange = (e) => {
        const {id, value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    function handleRegister(e) {
        e.preventDefault();
        authService.register(state).then(
            () => {
                navigate("/user/dashboard");
                window.location.reload();
            },
            error => {
                const errorMessage = error.response?.data?.message || "An error occurred while logging in.";
                setSnackBarMessage(errorMessage);
                setShowSnackbar(true);
                console.log(error)
            }
        );
    }

    return(
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                <CustomTextField id="username" variant="outlined" fullWidth onChange={handleChange}/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email" variant="outlined" fullWidth onChange={handleChange}/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" variant="outlined" fullWidth onChange={handleChange}/>
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth onClick={handleRegister}>
                Sign Up
            </Button>
        </Box>
        {subtitle}
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={snackBarMessage}
        />
    </>
    )
};

export default AuthRegister;
