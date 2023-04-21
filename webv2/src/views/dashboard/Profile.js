import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import {
  Typography
} from '@mui/material';

const Profile = () => {
  return (
    <PageContainer title="Profile" description="Access user profile">

      <DashboardCard title="User Profile">
        <Typography>User profile</Typography>
        
      </DashboardCard>
    </PageContainer>
  );
};

export default Profile;
