const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

let endpoints = {
    product: 'api/product/1?with[]=images&with[]=productSizes',
};

let API_ENDPOINTS = {};

for (const [key, value] of Object.entries(endpoints)) {
  API_ENDPOINTS[key] = `${API_BASE_URL}${value}`;
}

export const apiEndpoint = API_ENDPOINTS;
