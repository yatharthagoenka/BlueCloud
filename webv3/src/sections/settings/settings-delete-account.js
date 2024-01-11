import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const SettingsDeleteAccount = () => {
  const router = useRouter();
  const auth = useAuth();
  const [values, setValues] = useState({
    password: ''
  });

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
    try {
      await auth.deleteAccount(auth.user?.id, values.password, auth.user?.token);
      router.push('/auth/login');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Delete account and erase all data"
          title="Delete Account"
          sx={{color: 'red'}}
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
              helperText="Enter password to confirm"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{backgroundColor: 'error.main'}} type="submit">
            Delete
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
