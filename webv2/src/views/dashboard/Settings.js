import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import {
  Typography
} from '@mui/material';

const Settings = () => {
  return (
    <PageContainer title="Settings" description="Change user account settings">

      <DashboardCard title="Settings">
        <Typography>Account Settings</Typography>
              </DashboardCard>
    </PageContainer>
  );
};

export default Settings;
