import axios from "axios";
import { getUserSession } from "./userModel";

export const getRestaurtans = ({ country, lat: latitude, lng: longitude }) => {
  return axios({
    headers: {
      Authorization: getUserSession()
    },
    method: "GET",
    url: "http://localhost:8080/api/restaurant/searchRestaurants",
    params: {
      country,
      latitude,
      longitude,
      max: 20
    }
  });
};
