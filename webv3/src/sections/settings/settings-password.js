import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import FilesService from 'src/contexts/app-context';

export const SettingsPassword = () => {
  const auth = useAuth();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');

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
    if(values.password === values.confirm){
      setError('');
      try{
        await FilesService.updateUser({password: values.password}, auth.user?.id, auth.user?.token).then(
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
    }else{
      setError("Values do not match. Try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Password (Confirm)"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
          <Stack
            spacing={3}
            sx={{ pt: 1}}
          >
            <Typography variant='error' color="error.main">
              {error}
            </Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
