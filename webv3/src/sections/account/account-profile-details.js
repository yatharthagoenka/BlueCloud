import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import FilesService from 'src/contexts/app-context';
import { useAuth } from 'src/hooks/use-auth';

export const AccountProfileDetails = () => {
  const auth = useAuth();
  const [values, setValues] = useState({
    firstName: auth.user?.firstName,
    lastName: auth.user?.lastName,
    username: auth.user?.username,
    email: auth.user?.email,
  });

  useEffect(()=>{
    FilesService.getUser(auth.user?.id, auth.user?.token).then(
        response => {
          setValues({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            username: response.data.username,
          });
        }
    );
  }, [])

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await FilesService.updateUser(values, auth.user?.id, auth.user?.token).then(
        response => {
          console.log("User updated successfully")
        },
        error => {
          console.log(error)
        }
      );
    }catch(error){
      console.log(error);
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Username"
                  helperText="Username cannot be changed"
                  disabled
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
