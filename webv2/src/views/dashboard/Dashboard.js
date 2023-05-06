import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import GlobalActivity from './components/GlobalActivity';
import StorageStats from './components/StorageStats';
import MonthlyUsage from './components/MonthlyUsage';
import RecentActivity from './components/RecentActivity';
import LargestFiles from './components/LargestFiles';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <GlobalActivity />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StorageStats />
              </Grid>
              <Grid item xs={12}>
                <MonthlyUsage />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} lg={8}>
            <LargestFiles />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
