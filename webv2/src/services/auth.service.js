import axios from "axios";

class AuthService {
  async login(username, password) {
    return axios
      .post(`${process.env.REACT_APP_API_URL}` + "auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password) {
    return axios.post(process.env.REACT_APP_API_URL + "auth/register", {
      username,
      email,
      password
    }).then(response => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
