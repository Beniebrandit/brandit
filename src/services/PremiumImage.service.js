import { apiEndpoint, apiEndpointFunction } from "../library/endpoint";
import { authHeader } from "../library/authHeader";
import axios from "axios";

export const PremiumImage = {
  image,
  vectorimage,
};

function image() {
  return axios
    .get(apiEndpoint.image, {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}

function vectorimage() {
  return axios
    .get(apiEndpoint.vectorimage, {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}
