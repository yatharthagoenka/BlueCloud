import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import FilesService from 'src/contexts/files-context';
import { useAuth } from 'src/hooks/use-auth';
import NextLink from 'next/link';

const statusMap = {
  'false': 'warning',
  'true': 'success'
};

export const OverviewLatestFiles = (props) => {
  const {files} = props;
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Latest Files" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell sortDirection="desc">
                  Size (MB)
                </TableCell>
                <TableCell>
                  Access
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => {
                return (
                  <TableRow
                    hover
                    key={file.id}
                  >
                    <TableCell>
                    {
                      new Date(file.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    }
                    </TableCell>
                    <TableCell>
                      {file.originalname}
                    </TableCell>
                    <TableCell>
                      {Number((file.size/1000).toFixed(2))}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[file.rsa_priv_base64]}>
                        {file.rsa_priv_base64?'Retained': 'Revoked'}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          component={NextLink}
          href="/files"
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestFiles.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};