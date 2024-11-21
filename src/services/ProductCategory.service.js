import axios from "axios";
import { apiEndpoint, apiEndpointFunction } from "../library/endpoint";
import { authHeader } from "../library/authHeader";

export const ProductCategoryService =  {
   ProductCategory,
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