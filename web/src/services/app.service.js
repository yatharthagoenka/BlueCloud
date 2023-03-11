import axios from 'axios';
import authHeader from './auth-header';

class AppService {
  getTestContent() {
    return axios.get(`${process.env.REACT_APP_API_URL}`);
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
}

export default new AppService();
