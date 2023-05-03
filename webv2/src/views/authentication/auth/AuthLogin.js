import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/shared/CustomTextField';
import { Box,Typography,Button,Stack } from '@mui/material';
import AuthService from 'src/services/auth.service';


const AuthLogin = ({ title, subtitle, subtext }) => {
    const navigate = useNavigate();
    const [state , setState] = useState({
        username : "",
        password : ""
    })

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
            () => {
                navigate("/user/dashboard");
                window.location.reload();
            },
            error => {
                console.log(error)
            }
        );
    }
    
    return (
    <>
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
    </>
)};

export default AuthLogin;
