import axios from 'axios';

class AppService {
  async getTestContent() {
    return axios.get(process.env.REACT_APP_API_URL);
  }
  
  async getUserFiles(userID, authToken) {
    return axios.get(process.env.REACT_APP_API_URL + 'files/user', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID: userID
      }
    });
  }
  
  async uploadFile(file, userID, authToken) {
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
  
  async downloadFile(fileID, authToken) {
    return axios.get(process.env.REACT_APP_API_URL + 'files/download', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        fileID: fileID
      },
      responseType: 'blob'
    });
  }

  async deleteFile(userID, fileID, authToken) {
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

export default AppService = new AppService();
