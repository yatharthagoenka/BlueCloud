import axios from 'axios';

class AppService {
  async getPlatformMetrics() {
    return await axios.get(process.env.REACT_APP_API_URL + 'metrics');
  }
}

export default AppService = new AppService();
