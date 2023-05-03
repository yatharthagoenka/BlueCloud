import React, {useEffect, useState} from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AppService from '../../services/app.service'
import AuthService from '../../services/auth.service'
import {Typography,Table,TableBody,TableCell,TableHead,TableRow,Chip,Button, Grid} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Files = () => {
    const [files , setFiles] = useState([])
    const [user , setUser] = useState()
    const [selectedFile, setSelectedFile] = useState(null);
    let currentUser;

    useEffect(() => {
        currentUser = AuthService.getCurrentUser();
        setUser(currentUser.user)
    }, []);

    useEffect(()=>{
        if(!(files.content && files.content.length)){
            console.log("fetching files from server.")
            AppService.getUserFiles(currentUser.user._id, JSON.parse(localStorage.getItem("user")).token).then(
                response => {
                    setFiles(response.data.files);
                },
                error => {
                    console.log(error)
                }
            );
        }
    }, [])

    const deleteFile = (fileID) => {
        AppService.deleteFile(user._id, fileID, JSON.parse(localStorage.getItem("user")).token).then(
            response => {
                const updatedFiles = files.filter(file => file.fileID !== fileID);
                setFiles(updatedFiles);
            },
            error => {
                console.log(error)
            }
        );
    }

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        console.log(user._id)
        const data = new FormData()
        data.append('file', selectedFile)
        AppService.uploadFile(data, user._id, JSON.parse(localStorage.getItem("user")).token).then(
            response => {
                const updatedFiles = [...files, response.data];
                setFiles(updatedFiles);
                setSelectedFile(null);
            },
            error => {
                console.log(error)
            }
        );
    };

    return (
        <PageContainer title="Files" description="Access user uploaded files">

        <DashboardCard title="My Files">
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>All of the uploaded files appear here</Typography>
                </Grid>
                <Grid>
                    <input
                        id="select-file"
                        type="file"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="select-file">
                    <Button
                        variant="text"
                        component="span"
                    >
                        {selectedFile ? selectedFile.name : 'Select File'}
                    </Button>
                    </label>
                    <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        disabled={!Boolean(selectedFile)}
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </Grid>
            </Grid>
            <Table
            aria-label="simple table"
            sx={{
                whiteSpace: "nowrap",
                mt: 2
            }}
            >
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Name
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            ID
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Role
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                            Actions
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {files.map((file) => (
                    <TableRow key={file.fileID}>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={400}>
                                    {file.originalname}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                    {file.fileID}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        px: "4px",
                                        backgroundColor: file.pbg,
                                        color: "#fff",
                                    }}
                                    size="small"
                                    label={file.role[0]}
                                ></Chip>
                            </TableCell>
                            <TableCell align="right">
                                    <Button color="success" target="_blank" variant="contained" aria-label="download" size="small">
                                        Download
                                    </Button>
                                    &nbsp; 
                                    <Button color="error" target="_blank" variant="contained" onClick={()=>deleteFile(file.fileID)} aria-label="delete" size="small">
                                        Delete
                                    </Button>   
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DashboardCard>
        </PageContainer>
    );
};

export default Files;
