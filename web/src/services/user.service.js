import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getTestContent() {
    return axios.get(process.env.REACT_APP_API_URL);
  }

  getUserBoard() {
    return axios.get(process.env.REACT_APP_API_URL + 'user', { headers: authHeader() });
  }
}

export default new UserService();
