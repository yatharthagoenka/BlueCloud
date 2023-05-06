import React, {useState, useEffect} from 'react';
import {Typography,Table,TableBody,TableCell,TableHead,TableRow,Chip, Box} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import AppService from '../../../services/app.service'
import AuthService from '../../../services/auth.service'

const LargestFiles = () => {
    const [files , setFiles] = useState([])
    const [user , setUser] = useState()
    let currentUser;

    useEffect(() => {
        currentUser = AuthService.getCurrentUser();
        setUser(currentUser.user)
    }, []);

    useEffect(() => {
        console.log(files)
    }, [files]);

    useEffect(()=>{
        AppService.getLargestFiles(currentUser.user._id, JSON.parse(localStorage.getItem("user")).token).then(
            response => {
                console.log(response.data)
                setFiles(response.data);
            },
            error => {
                console.log(error)
            }
        );
    }, [])

    return (
        <DashboardCard title="Largest Files">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
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
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Role
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Size
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((file, index) => (
                            <TableRow key={index+1}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {index+1}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {file.originalname}
                                        </Typography>
                                    </Box>
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
                                <TableCell>
                                    <Typography variant="h6">{Number((file.size/1000).toFixed(3))} MB</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default LargestFiles;