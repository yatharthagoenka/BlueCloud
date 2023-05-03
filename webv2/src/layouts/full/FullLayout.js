import React, { useState, useEffect } from "react";
import { styled, Container, Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("user")){
      console.log("nouser")
      navigate('/auth/login');
    }
  }, []);

  return (
    <MainWrapper
      className='mainwrapper'
    >
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
      {/* Main Wrapper */}
      <PageWrapper
        className="page-wrapper"
      >
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        {/* PageContent */}
        <Container sx={{
          paddingTop: "20px",
          maxWidth: '1200px',
        }}
        >
          {/* Page Route */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* End Page */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
