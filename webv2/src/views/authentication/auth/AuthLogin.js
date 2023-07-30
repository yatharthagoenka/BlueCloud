import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/shared/CustomTextField';
import { Box,Typography,Button,Stack } from '@mui/material';
import AuthService from 'src/services/auth.service';
import Snackbar from '@mui/material/Snackbar';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const navigate = useNavigate();
    const [state , setState] = useState({
        username : "",
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
    function handleLogin(e) {
        e.preventDefault();

        AuthService.login(state.username, state.password).then(
            response => {
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
    
    return (
    <>
    <div>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Stack>
            <Box>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                <CustomTextField id="username" variant="outlined" onChange={handleChange} fullWidth />
            </Box>
            <Box mt="25px">
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                <CustomTextField id="password" type="password" variant="outlined" onChange={handleChange} fullWidth />
            </Box>
        </Stack>
        <Box mt={3}>
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                onClick={handleLogin}
                type="submit"
            >
                Sign In
            </Button>
        </Box>
        {subtitle}
    </div>
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackBarMessage}
    />
    </>
)};

export default AuthLogin;
