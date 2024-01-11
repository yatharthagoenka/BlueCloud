import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import FilesService from 'src/contexts/app-context';

const user = {
  avatar: '/assets/avatars/avatar-cao-yu.png',
};
import { useAuth } from 'src/hooks/use-auth';

export const AccountProfile = () => {
  const auth = useAuth();
  const [values, setValues] = useState({
    firstName: auth.user?.firstName,
    lastName: auth.user?.lastName,
  });

  useEffect(()=>{
    FilesService.getUser(auth.user?.id, auth.user?.token).then(
        response => {
          setValues({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          });
        }
    );
  }, [])
  return (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {values.firstName} {values.lastName}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {auth.user?.email}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
  )
};
