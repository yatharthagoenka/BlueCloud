import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FilesCard } from 'src/sections/files/files-card';
import { FilesSearch } from 'src/sections/files/files-search';
import FilesService from 'src/contexts/app-context';
import { useAuth } from 'src/hooks/use-auth';

const Page = () => {
  const auth = useAuth();
  const fileInputRef = React.createRef();

  const [files , setFiles] = useState([]);

  useEffect(()=>{
    if(!(files.content && files.content.length)){
      try{
        FilesService.getUserFiles(auth.user?.id, auth.user?.token).then(
            response => {
              setFiles(response.data.files);
            }
        );
      }catch(error){
        console.log(error);
      }
    }
  }, [])

  const handleNewFileChange = async (event) => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    try{
      await FilesService.uploadFile(data, auth.user?.id, auth.user?.token).then(
        response => {
          const updatedFiles = [...files, response.data];
          setFiles(updatedFiles);
        },
        error => {
          console.log(error)
        }
      );
    }catch(error){
      console.log(error);
    }
  };
  const handleNewFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const editFileAccess = (fileID) => {
    const updatedFiles = files.map(file => {
        if (file._id === fileID) {
          return { ...file, rsa_priv_base64: 0 };
        }
        return file;
    });
    setFiles(updatedFiles);
  };

  const handleFileDelete = (fileID) => {
    setFiles(files.filter(file => file._id !== fileID));
  };
  
  return (
  <>
    <Head>
      <title>
        Files | BlueCloud
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Files
              </Typography>
            </Stack>
            <div>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleNewFileChange}
              />
              <Button
                onClick={handleNewFileButtonClick}
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <FilesSearch />
          <Grid
            container
            spacing={3}
          >
            {files.map((file) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={file._id}
              >
                <FilesCard key={file._id} file={file} user={auth.user} onDelete={handleFileDelete} editFileAccess={editFileAccess} />
              </Grid>
            ))}
          </Grid>
        </Stack>
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
