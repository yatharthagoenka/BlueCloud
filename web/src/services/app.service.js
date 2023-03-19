import axios from 'axios';
import authHeader from './auth-header';

class AppService {
  getTestContent() {
    return axios.get(`${process.env.REACT_APP_API_URL}`);
  }
  
  getUserFiles(userID, authToken) {
    return axios.get(process.env.REACT_APP_API_URL + 'files/user', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID: userID
      }
    });
  }
  
  uploadFile(file, userID, authToken) {
    return axios.post(process.env.REACT_APP_API_URL + 'files/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID: userID
      }
    });
  }
  
  downloadFile(fileID, authToken) {
    return axios.get(process.env.REACT_APP_API_URL + 'files/download', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        fileID: fileID
      }
    });
  }

  deleteFile(userID, fileID, authToken) {
    return axios.delete(process.env.REACT_APP_API_URL + 'files', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID: userID,
        fileID: fileID
      }
    });
  }
}

export default new AppService();
