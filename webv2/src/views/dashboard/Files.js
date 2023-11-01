import React, {useEffect, useState} from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AppService from '../../services/app.service'
import AuthService from '../../services/auth.service'
import {Typography,Table,TableBody,TableCell,TableHead,TableRow,Chip,Button,Grid} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {DialogContentText, TextField} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import SnackbarComponent from 'src/components/shared/Snackbar';

const Files = () => {
    const [files , setFiles] = useState([])
    const [user , setUser] = useState()
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadFlag, setUploadFlag] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("info");
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [showDownloadWithKeyModal, setShowDownloadWithKeyModal] = useState(false);
    const [getKeyFileID, setGetKeyFileID] = useState("");
    const [downloadWithKeyFilename, setDownloadWithKeyFilename] = useState("");
    const [privateKeyString, setPrivateKeyString] = useState("");

    let currentUser;

    useEffect(() => {
        currentUser = AuthService.getCurrentUser();
        setUser(currentUser.user)
    }, []);

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };
    
    const handleKeyDialogClose = () => {
        setPrivateKeyString("");
        setShowKeyModal(false);
        setShowDownloadWithKeyModal(false);
    }

    useEffect(()=>{
        if(!(files.content && files.content.length)){
            AppService.getUserFiles(currentUser.user._id, JSON.parse(localStorage.getItem("user")).token).then(
                response => {
                    setFiles(response.data.files);
                },
                error => {
                    setSnackBarMessage("Error getting files. Try reloading the page.");
                    setSnackBarSeverity("error")
                    setShowSnackbar(true);
                }
            );
        }
    }, [])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(privateKeyString);
        setSnackBarMessage("Copied to clipboard");
        setSnackBarSeverity("success")
        setShowSnackbar(true);
    };

    const handleGetKey = (fileID) => {
        setGetKeyFileID(fileID);
        setShowKeyModal(true);
    }

    const getKey = () => {
        // const currFile = files.find(file => file.fileID === getKeyFileID);
        AppService.getKeyID(user._id, getKeyFileID, JSON.parse(localStorage.getItem("user")).token).then(
            response => {
                setPrivateKeyString(response.data.value)
                if(response.data.value == ""){
                    setSnackBarMessage("Key not found in file record.");
                    setSnackBarSeverity("error");
                    setShowSnackbar(true);
                }
                const updatedFiles = files.map(file => {
                    if (file.fileID === getKeyFileID) {
                      return { ...file, access: 0 };
                    }
                    return file;
                });
                setFiles(updatedFiles);
                setGetKeyFileID("");
            },
            error => {
                setSnackBarMessage(error);
                setSnackBarSeverity("error");
                setShowSnackbar(true);
                setGetKeyFileID("");
            }
        )
    }

    const downloadFile = (originalname, fileID, access, privateKeyString) => {
        if(!access){
            setDownloadWithKeyFilename(originalname);
            setGetKeyFileID(fileID);
            setShowDownloadWithKeyModal(true);
        }else{
            AppService.downloadFile(fileID, privateKeyString, JSON.parse(localStorage.getItem("user")).token).then(
                response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', originalname);
                    document.body.appendChild(link);
                    link.click();
                },
                error => {
                    setSnackBarMessage("Error downloading file. Try again.");
                    setSnackBarSeverity("error");
                    setShowSnackbar(true);
                }
            );
        }
    }

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

    const handlePrivateKeyFieldChange = (e) => {
        setPrivateKeyString(e.target.value);
    }

    const handleUpload = (e) => {
        setUploadFlag(true);
        if(selectedFile != null){
            const data = new FormData()
            data.append('file', selectedFile)
            AppService.uploadFile(data, user._id, JSON.parse(localStorage.getItem("user")).token).then(
                response => {
                    console.log(response)
                    const updatedFiles = [...files, response.data];
                    
                    setSnackBarMessage('Uploaded file successfully.');
                    setSnackBarSeverity("success")
                    setShowSnackbar(true)

                    setFiles(updatedFiles);
                    setUploadFlag(false);
                    setSelectedFile(null);
                },
                error => {
                    setSnackBarMessage('Error uploading file.');
                    setSnackBarSeverity("error")
                    setShowSnackbar(true)
                    console.log(error)
                }
                );
        }else{
            setSnackBarMessage('No file selected.');
            setSnackBarSeverity("warning")
            setShowSnackbar(true)
            setUploadFlag(false);
        }
    };

    return (
        <PageContainer title="Files" description="Access user uploaded files">
        <Dialog open={showKeyModal} onClose={handleKeyDialogClose}>
            <DialogTitle>Get Private Key  🚀 </DialogTitle>
            <DialogContent>
            <DialogContentText>
            Once you choose to get the private key, we will remove it from our systems, <span style={{color: "red"}}>irreversibly</span>.
            </DialogContentText>
            {privateKeyString && 
                <div>
                    <br/>
                    <DialogContentText onClick={copyToClipboard} style={{padding: 20, marginTop: 20, backgroundColor: '#949292', color: 'white', overflowX: 'auto', position: 'relative',}}>
                    {privateKeyString}
                    </DialogContentText>
                </div>
            }
            </DialogContent>
            <DialogActions>
            <Button onClick={handleKeyDialogClose}>Cancel</Button>
            <Button onClick={getKey}>Fetch</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={showDownloadWithKeyModal} onClose={handleKeyDialogClose}>
            <DialogTitle>Download with Private key 🔒</DialogTitle>
            <DialogContent>
            <DialogContentText>
                BlueCloud access for this file has been revoked. Please enter the private key to decrypt and download the file.
            </DialogContentText>
            <br/>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                onChange={handlePrivateKeyFieldChange}
                label="Private Key"
                type="text"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleKeyDialogClose}>Cancel</Button>
            <Button onClick={()=>{downloadFile(downloadWithKeyFilename, getKeyFileID, 1, privateKeyString)}}>Download</Button>
            </DialogActions>
        </Dialog>
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
                    <LoadingButton
                        color="primary"
                        onClick={handleUpload}
                        loading={uploadFlag}
                        loadingPosition="start"
                        startIcon={<CloudUploadIcon />}
                        variant="contained"
                    >
                        <span>Upload</span>
                    </LoadingButton>
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
                                        backgroundColor: file.role[0] === "owner" ? "primary.main" : 
                                            file.role[0] === "editor" ? "secondary.main" : "warning.main",
                                        color: "#fff",
                                    }}
                                    size="small"
                                    label={file.role[0]}
                                ></Chip>
                            </TableCell>
                            <TableCell align="right">
                                    <Button color="info" target="_blank" variant="contained" onClick={()=>handleGetKey(file.fileID)} aria-label="getKey" size="small">
                                        Get Key
                                    </Button>
                                    &nbsp; &nbsp; 
                                    <Button color={ file.access? "success": "warning"} target="_blank" variant="contained" onClick={()=>downloadFile(file.originalname, file.fileID, file.access)} aria-label="download" size="small">
                                        Download
                                    </Button>
                                    &nbsp; &nbsp; 
                                    <Button color="error" target="_blank" variant="contained" onClick={()=>deleteFile(file.fileID)} aria-label="delete" size="small">
                                        Delete
                                    </Button>   
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DashboardCard>
        <SnackbarComponent
            open={showSnackbar}
            handleClose={handleSnackbarClose}
            severity={snackBarSeverity}
            message={snackBarMessage}
        />
        </PageContainer>
    );
};

export default Files;
