import React, {useState, useEffect} from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CustomTextFieldWithButton from 'src/components/shared/CustomTextFieldButton';
import authService from 'src/services/auth.service';

const Profile = () => {
  const user = authService.getCurrentUser().user;
  const [state , setState] = useState({
    username : "",
    email: "",
  })

  useEffect(()=>{
    setState({
      username: user.username,
      email: user.email
    })
  }, [])

  return (
    <PageContainer title="Profile" description="Access user profile">

      <DashboardCard title="User Profile">
        <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">Username</Typography>
                <CustomTextFieldWithButton id="username" placeholder={user.username} variant="outlined" fullWidth value={state.username} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextFieldWithButton id="email" placeholder={user.email} variant="outlined" fullWidth value={state.email} />
            </Stack>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Profile;