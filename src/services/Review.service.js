import axios from "axios";
import { apiEndpoint, apiEndpointFunction } from "../library/endpoint";
import { authHeader } from "../library/authHeader";

export const ReviewService = {
  Postreview,
  Reviews,
  ProductReview,
  Faq,
  LikeDislike,
  GetReviewById
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
function Faq() {
  return axios
    .get(apiEndpoint.faq, {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}

function ProductReview(id) {
  return axios
    .get(apiEndpointFunction.productreview(id), {
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
    .post(apiEndpoint.review, data, {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}
function LikeDislike(data) {
  return axios
    .post(apiEndpoint.likedislike, data, {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}
function GetReviewById(id) {
  return axios
    .get(apiEndpointFunction.getreviewbyid(id), {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}
