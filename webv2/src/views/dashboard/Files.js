import React, {useEffect, useState} from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AppService from '../../services/app.service'
import AuthService from '../../services/auth.service'
import {Typography,Table,TableBody,TableCell,TableHead,TableRow,Chip,Button} from '@mui/material';

// const files = [
//     {
//         id: "1",
//         name: "Sample file 1",
//         uuid: "efalnjkfn3423nlkdvkldsv909",
//         role: "OWNER",
//         pbg: "error.main",
//     },
//     {
//         id: "2",
//         name: "Sample file 2",
//         uuid: "efauiumfehd423nlkdvklds64",
//         role: "EDITOR",
//         pbg: "info.main",
//     },
//     {
//         id: "3",
//         name: "Sample file 3",
//         uuid: "bfabyhmyumu3nlkdvkldsv909",
//         role: "EDITOR",
//         pbg: "info.main",
//     },
//     {
//         id: "4",
//         name: "Sample file 4",
//         uuid: "tgretjkf4ewtertkdvkldsv23",
//         role: "VIEWER",
//         pbg: "success.main",
//     },
// ];

const Files = () => {
    const [files , setFiles] = useState([])
    const [user , setUser] = useState()
    let currentUser = '';

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

    return (
        <PageContainer title="Files" description="Access user uploaded files">

        <DashboardCard title="My Files">
            <Typography>All of the uploaded files appear here</Typography>
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
