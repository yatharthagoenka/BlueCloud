import axios from 'axios';

class AppService {
  async getTestContent() {
    return await axios.get(process.env.REACT_APP_API_URL);
  }

  async getUser(userID, authToken){
    return await axios.get(process.env.REACT_APP_API_URL + 'user',{
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID
      }
    })
  }
  
  async getUserFiles(userID, authToken) {
    return await axios.get(process.env.REACT_APP_API_URL + 'files/user', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID: userID
      }
    });
  }
  
  async uploadFile(file, userID, authToken) {
    return await axios.post(process.env.REACT_APP_API_URL + 'files/upload', file, {
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
    return await axios.get(process.env.REACT_APP_API_URL + 'files/download', {
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
    return await axios.delete(process.env.REACT_APP_API_URL + 'files', {
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
