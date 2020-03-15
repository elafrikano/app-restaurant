import axios from "axios";

export const setUserSession = token => {
  sessionStorage.setItem("user_session", token);
};

export const getUserSession = () => sessionStorage.getItem("user_session");

export const setUserSessionData = data => {
  sessionStorage.setItem("userData", JSON.stringify(data));
};

export const getUserInfo = () => {
  return axios({
    headers: {
      Authorization: getUserSession()
    },
    method: "GET",
    url: "http://localhost:8080/api/user/getUser"
  });
};
