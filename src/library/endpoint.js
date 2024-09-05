import _ from "lodash";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

let endpoints = {
    product: 'api/product/1?with[]=images&with[]=productSizes&with[]=categories.subCategories.image',
};
let API_ENDPOINTS = {};

_.forEach(
  endpoints,
  (value, key) => (API_ENDPOINTS[key] = `${API_BASE_URL}${value}`)
);
export const apiEndpoint = API_ENDPOINTS;
