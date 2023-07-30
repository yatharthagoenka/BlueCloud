import axios from "axios";

class AuthService {
  async login(username, password) {
    return await axios
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

  async register(user){
    const username = user.username;
    const password = user.password;
    const email = user.email;
    return await axios.post(process.env.REACT_APP_API_URL + "auth/register", {
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

  updateCurrentUser(field, value) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      currentUser.user[field] = value;
      localStorage.setItem('user', JSON.stringify(currentUser));
    }
  }
  
}

export default new AuthService();
