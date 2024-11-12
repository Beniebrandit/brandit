import axios from "axios";
import { apiEndpoint, apiEndpointFunction } from "../library/endpoint";
import { authHeader } from "../library/authHeader";

export const ReviewService = {
  Postreview,
  Reviews,
};

function Reviews() {
  return axios
    .get(apiEndpoint.review, {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}

function Postreview(data) {
  return axios
    .post(apiEndpoint.postreview, data, {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}