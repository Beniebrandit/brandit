import _ from "lodash";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

let endpoints = {
  allproduct: "api/product",
  //product: "api/product/1?with[]=images&with[]=productSizes&with[]=categories.subCategories.image",
  productlist: "api/product?with[]=images",
  selectedproductdata: "api/getPrice",
  register: "api/register",
  image: "api/premium-images-category?with[]=images&where[type]=1",
  vectorimage: "api/premium-images-category?with[]=images&where[type]=2",
  review: "api/review",
  productreview: "api/review?where[product_id]=",
  productCategory: "api/product-category?with[images]=images",
  faq: "api/faq",
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
  productreview: (id) => {
    return API_BASE_URL + `${endpoints.productreview}${id}`;
  },
  productdetail: (id) => {
    return `${API_BASE_URL}${endpoints.allproduct}/${id}?with[]=images&with[]=productSizes&with[]=categories.subCategories.image`;
  },
};

export const apiEndpointFunction = API_ENDPOINTS_FUNCTION;
