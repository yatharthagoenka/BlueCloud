import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewUsers } from 'src/sections/overview/overview-users';
import { OverviewFiles } from 'src/sections/overview/overview-files';
import { OverviewLatestFiles } from 'src/sections/overview/overview-latest';
import { OverviewHours } from 'src/sections/overview/overview-hours';
import { OverviewStorage } from 'src/sections/overview/overview-storage';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import FilesService from 'src/contexts/files-context';
import { useAuth } from 'src/hooks/use-auth';

const now = new Date();

const Page = () => {
  const auth = useAuth();
  const [metrics, setMetrics] = useState({
    userCount: 0,
    fileCount: 0, 
    activeHours: 0, 
    storageUsed: 0
  });

  useEffect(() => {
    FilesService.getPlatformMetrics().then(
        response => {
          setMetrics(response.data);
      }
    );
  }, []);
  useEffect(() => {
    FilesService.getUser(auth.user.id, auth.user.token).then(
      response => {
        setMetrics(prevMetrics => ({
          ...prevMetrics,
          fileCount: response.data.files.length,
          storageUsed: Number((response.data.storage/1000).toFixed(2))
        }));
      }
    );
    
  }, []);

  return (
  <>
    <Head>
      <title>
        Overview | BlueCloud
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
      <Container maxWidth="xl">
        <div>
          <Typography variant="h5">
            Dashboard
          </Typography>
        </div>
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewUsers sx={{ height: '100%' }} userCount={metrics.userCount}/>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewFiles
              sx={{ height: '100%' }}
              fileCount={metrics.fileCount}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewStorage
              sx={{ height: '100%' }}
              value={Number(metrics.storageUsed.toFixed(2))}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewHours
              sx={{ height: '100%' }}
              value={metrics.activeHours}
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewLatestFiles />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
