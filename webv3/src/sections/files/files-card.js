import { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ButtonBase from '@mui/material/ButtonBase';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DownloadWithKey } from './key-download';
import { GetKeyDialog } from './get-key';
import FilesService from 'src/contexts/files-context';

export const FilesCard = (props) => {
  const { file, user, onDelete, editFileAccess} = props;
  const [contextMenu, setContextMenu] = useState(null);
  const [getKeyDialog, setGetKeyDialog] = useState(false);
  const [useKeyDialog, setUseKeyDialog] = useState(false);
  
  const handleFileDownload = () => {
    if(!file.rsa_priv_base64){
      setUseKeyDialog(true);
    }else{
        FilesService.downloadFile(file._id, '',user.token).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.originalname);
                document.body.appendChild(link);
                link.click();
            },
            error => {
              console.log(error);
            }
        );
    }
  }

  const handleFileDownloadClose = () => {
    setUseKeyDialog(false);
  };

  const handleGetKey = () => {setGetKeyDialog(true);}
  const handleGetKeyClose = () => {
    setGetKeyDialog(false);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };
  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  const deleteFile = () => {
    FilesService.deleteFile(user.id, file._id, user.token).then(
        response => {
          onDelete(file._id);
        },
        error => {
          console.log(error);
        }
    );
  }

  return (
    <Card onContextMenu={handleContextMenu} style={{ cursor: 'pointer' }} sx={{height: '11rem'}}>
      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleGetKey}>Revoke Key</MenuItem>
        <MenuItem disabled>Share</MenuItem>
        <MenuItem sx={{color: 'red'}} onClick={deleteFile}>DELETE</MenuItem>
      </Menu>
      <GetKeyDialog 
        open={getKeyDialog} 
        fileID={file._id} 
        userID={user.id} 
        token={user.token} 
        onClose={handleGetKeyClose} 
        editFileAccess={editFileAccess}
      />
      <DownloadWithKey open={useKeyDialog} file={file} token={user.token} onClose={handleFileDownloadClose}/>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              ACCESS: {file.rsa_priv_base64?
              <span style={{color: 'green'}}>RETAINED</span>
              :
              <span style={{color: 'red'}}>REVOKED</span>}
            </Typography>
            <Typography variant="h6">
              {file.originalname}
            </Typography> 
          </Stack>
          
          <Avatar
            sx={{
              backgroundColor: file.rsa_priv_base64?'success.main':'warning.main',
              height: 56,
              width: 56
            }}
            onClick={handleFileDownload}
          >
            <SvgIcon>
              <ArrowDownIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Typography
            color="info.main"
            variant="body2"
          >
            {file.size} KBs
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

FilesCard.propTypes = {
  file: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};
