import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:1337/users/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUserBoard = async () => {
  return await axios.get(API_URL, { 
    params: {
        role: {
           name: 'Authenticated' 
        },
    }, 
    headers: authHeader() });
};

const getModeratorBoard = async () => {
    return await axios.get(API_URL, { 
        params: {
        role: {
             name: 'Moderator' 
        },
    }, 
    headers: authHeader() });
};

const forExport = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
};

export default forExport;