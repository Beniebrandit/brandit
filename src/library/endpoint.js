import _ from "lodash";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

let endpoints = {
  product: "api/product/1?with[]=images&with[]=productSizes&with[]=categories.subCategories.image",
  selectedproductdata: "api/getPrice",
};
let API_ENDPOINTS = {};

_.forEach(
  endpoints,
  (value, key) => (API_ENDPOINTS[key] = `${API_BASE_URL}${value}`)
);
export const apiEndpoint = API_ENDPOINTS;

let API_ENDPOINTS_FUNCTION = {
  selectedproductdata: (id) => {
    return API_BASE_URL + `${endpoints.selectedproductdata}/${id}`;
  },
};

export const apiEndpointFunction = API_ENDPOINTS_FUNCTION;
