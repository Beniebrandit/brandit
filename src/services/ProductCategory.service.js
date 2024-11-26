import axios from "axios";
import { apiEndpoint, apiEndpointFunction } from "../library/endpoint";
import { authHeader } from "../library/authHeader";

export const ProductCategoryService = {
  ProductCategory,
  ProductDetail,
};


function ProductCategory() {
  return axios
    .get(apiEndpoint.productCategory, {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }  
    });
}

function ProductDetail(id) {
  return axios
    .get(apiEndpointFunction.productdetail(id), {
      headers: authHeader(),
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}

