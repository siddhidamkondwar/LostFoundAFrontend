import axios from "axios";

const LOGIN_URL = "http://localhost:9595/lostfound/login";
const ROLE_URL = "http://localhost:9595/lostfound/role";
const USER_URL = "http://localhost:9595/lostfound/user";
const LOGOUT_URL = "http://localhost:9595/lostfound/logout";
const STD_URL = "http://localhost:9595/lostfound/student";
const ME_URL = "http://localhost:9595/lostfound/me";

export const registerNewUser = (user) => {
  return axios.post(LOGIN_URL, user, {
    withCredentials: true,
  });
};

export const validateUser = (userId, password) => {
  return axios.get(`${LOGIN_URL}/${userId}/${password}`, {
    withCredentials: true,
  });
};

export const getUserDetails = () => {
  return axios.get(LOGIN_URL, {
    withCredentials: true,
  });
};

export const getUserId = () => {
  return axios.get(USER_URL, {
    withCredentials: true,
  });
};

export const getAllStudents = () => {
  return axios.get(STD_URL, {
    withCredentials: true,
  });
};

export const logoutUser = () => {
  return axios.post(
    LOGOUT_URL,
    {},
    {
      withCredentials: true,
    }
  );
};

export const getRole = () => {
  return axios.get(ROLE_URL, {
    withCredentials: true,
  });
};

export const deleteUser = (username) => {
  return axios.delete(`${LOGIN_URL}/${username}`, {
    withCredentials: true,
  });
};



export const getUser = () => {
    return axios.get(ME_URL, {
    withCredentials: true,
  });
}