import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Stack } from '@mui/system';
import CustomTextField from '../../../components/shared/CustomTextField';
import authService from 'src/services/auth.service';
import SnackbarComponent from 'src/components/shared/Snackbar';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const navigate = useNavigate();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const [state , setState] = useState({
        username : "",
        email: "",
        password : ""
    })
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");

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
        if(state.username==""){
            setSnackBarMessage("Please enter a valid username.");
            setSnackBarSeverity("error")
            setShowSnackbar(true);
            return;
        }
        if(!emailRegex.test(state.email)){
            setSnackBarMessage("Please enter a valid email address.");
            setSnackBarSeverity("error")
            setShowSnackbar(true);
            return;
        }
        if(!passwordRegex.test(state.password)){
            setSnackBarMessage("Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
            setSnackBarSeverity("error")
            setShowSnackbar(true);
            return;
        }
        authService.register(state).then(
            () => {
                navigate("/user/dashboard");
                window.location.reload();
                setSnackBarSeverity("success")
            },
            error => {
                const errorMessage = error.response?.data?.message || "An error occurred while signing up.";
                setSnackBarMessage(errorMessage);
                setSnackBarSeverity("error")
                setShowSnackbar(true);
                console.log(error)
            }
        );
    }

    return(
    <>
    <div>
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
                <CustomTextField id="email" type={"email"} variant="outlined" fullWidth onChange={handleChange}/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" type="password" variant="outlined" fullWidth onChange={handleChange}/>
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth onClick={handleRegister}>
                Sign Up
            </Button>
        </Box>
        {subtitle}
        </div>
        <SnackbarComponent open={showSnackbar} handleClose={handleSnackbarClose} severity={snackBarSeverity} message={snackBarMessage} />
    </>
)};

export default AuthRegister;
