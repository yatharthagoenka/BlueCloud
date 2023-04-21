import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button
} from '@mui/material';

const files = [
    {
        id: "1",
        name: "Sample file 1",
        key: "efalnjkfn3423nlkdvkldsv909",
        role: "OWNER",
        pbg: "error.main",
    },
    {
        id: "2",
        name: "Sample file 2",
        key: "efauiumfehd423nlkdvklds64",
        role: "EDITOR",
        pbg: "info.main",
    },
    {
        id: "3",
        name: "Sample file 3",
        key: "bfabyhmyumu3nlkdvkldsv909",
        role: "EDITOR",
        pbg: "info.main",
    },
    {
        id: "4",
        name: "Sample file 4",
        key: "tgretjkf4ewtertkdvkldsv23",
        role: "VIEWER",
        pbg: "success.main",
    },
];

const Files = () => {
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
                          Key
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
                  <TableRow key={file.id}>
                        <TableCell>
                            <Typography variant="subtitle2" fontWeight={400}>
                                {file.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {file.key}
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
                                label={file.role}
                            ></Chip>
                        </TableCell>
                        <TableCell align="right">
                                <Button color="success" target="_blank" variant="contained" aria-label="download" size="small">
                                    Download
                                </Button>
                                &nbsp; 
                                <Button color="error" target="_blank" variant="contained" aria-label="delete" size="small">
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
