import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FilesService from 'src/contexts/files-context';

export const DownloadWithKey = (props) => {
  const { open, file, token, onClose } = props;
  const [privateKey, setPrivateKey] = useState(null);

  const handleFileDownload = () => {
    FilesService.downloadFile(file._id, privateKey,token).then(
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

  const handleChange = (e) => {
    setPrivateKey(e.target.value);
  }

  return (
    <>
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>Download with Private key 🔒</DialogTitle>
        <DialogContent>
        <DialogContentText>
            BlueCloud's access to this file has been revoked. Please enter the private key to decrypt and download the file.
        </DialogContentText>
        <br/>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleChange}
            label="Private Key"
            type="text"
            fullWidth
            variant="standard"
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleFileDownload}>Download</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DownloadWithKey.propTypes = {
  file: PropTypes.object.isRequired,
};
