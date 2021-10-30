import axios from "axios";

const API_URL = "http://localhost:1337/auth/local/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (identifier, password) => {
  return axios
    .post(API_URL, {
      identifier,
      password,
    })
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = { 
    register, 
    login, 
    logout 
};

export default authService;