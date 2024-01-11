import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { OutlinedInput } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import FilesService from 'src/contexts/app-context';

export const GetKeyDialog = (props) => {
  const { open, fileID, userID, token, onClose, editFileAccess } = props;
  const [privateKey, setPrivateKey] = useState(null);

  const handleGetKey = () => {
    FilesService.getKey(userID, fileID,token).then(
        response => {
          setPrivateKey(response.data.value);
          editFileAccess(fileID);
        },
        error => {
          console.log(error);
        }
    );
  }

  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Get Private Key  🚀 </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{pb:2}}>
          Once you choose to get the private key, we will remove it from our systems, <span style={{color: "red"}}>irreversibly</span>.
          </DialogContentText>
          <OutlinedInput
            value={privateKey}
            fullWidth
            placeholder="private key string"
            sx={{ maxWidth: '100%' }}
          />
        </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleGetKey}>Get Key</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

GetKeyDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  editFileAccess: PropTypes.func.isRequired,
};
