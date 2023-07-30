import React, {useState} from 'react';
import { Button } from '@mui/material';
import CustomTextField from './CustomTextField';
import appService from 'src/services/app.service';
import authService from 'src/services/auth.service';
import SnackbarComponent from 'src/components/shared/Snackbar';

const CustomTextFieldWithButton = ({ ...rest }) => {
    const user = authService.getCurrentUser().user;
    const [value, setValue] = useState(rest.value || '');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("info");

    const handleSnackbarClose = (event, reason) => {
        setShowSnackbar(false);
    };
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleClick = (e) => {
        appService.updateUser(rest.id, value, user._id, JSON.parse(localStorage.getItem("user")).token).then(
            response => {
                authService.updateCurrentUser(rest.id, value);
                setSnackBarMessage(response.data.message);
                setSnackBarSeverity("success")
                setShowSnackbar(true);
            },
            error => {
                const errorMessage = error.response?.data?.message || "An error occurred while logging in.";
                setSnackBarMessage(errorMessage);
                setSnackBarSeverity("error")
                setShowSnackbar(true);
                console.log(error)
            }
        )
    };
  
  return (
    <>
    <CustomTextField
      {...rest}
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <Button variant="outlined" size="small" onClick={handleClick}>
            Update
          </Button>
        ),
      }}
      />
    <SnackbarComponent
        open={showSnackbar}
        onClose={handleSnackbarClose}
        message={snackBarMessage}
        severity={snackBarSeverity}
    />
    </>
  )
};

export default CustomTextFieldWithButton;