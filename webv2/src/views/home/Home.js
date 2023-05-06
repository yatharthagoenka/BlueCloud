import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import appService from 'src/services/app.service';
import { Link } from 'react-router-dom';
import { Hero } from './components/hero'
import { HeroIllustration } from './components/hero-illustration'
import { Layout } from './components/layout'

const Home = () => {
  const [testContent, setTestContent] = useState('');

  useEffect(()=>{
    appService.getTestContent().then(
      response => {
        setTestContent(response.data);
    },
      error => {
      console.log(error)
    })
  },[])

  return (
    <Layout>
      <Hero
        title="BlueCloud"
        content="BlueCloud is a cryptography-based cloud storage platform that allows you to upload, download, and manage your files securely from any anywhere internet access.  "
        illustration={<HeroIllustration />}
      />
    </Layout>
    // <PageContainer title="Home" description="landing page">
    //   <Box>
    //     <h1>BlueCloud</h1>
    //   </Box>
    //   <Link to={'/auth/login'}>Login</Link>
    //   <p>{testContent}</p>
    // </PageContainer>
  );
};

export default Home;
