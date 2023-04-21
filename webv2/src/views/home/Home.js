import React from 'react';
import { Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

const Home = () => {
  return (
    <PageContainer title="Home" description="landing page">
      <Box>
        <h1>BlueCloud</h1>
      </Box>
    </PageContainer>
  );
};

export default Home;
