import axios from "axios";
import { apiEndpoint, apiEndpointFunction } from "../library/endpoint";
import { authHeader } from "../library/authHeader";


export const ProductService = {
  product,
  ProductList,
  Allproduct,
  Dataprice,
  registers,
};

const token = localStorage.getItem("authToken");
//console.log(token, "token");

function product(){
    return (
      axios
        .get(
          apiEndpoint.product,
          {
            headers: { "Content-Type": "application/json","Authorization": `Bearer ${token}` },
            // params: {
            //   email
            // }
          }
        ).then(res => {
          if(res && res.status === 200){
            return res.data;
          }
        })
    );
  }
function ProductList(params) {
  return axios
    .get(apiEndpoint.productlist, {
      params: params,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}
  
function Allproduct() {
  return axios
    .get(apiEndpoint.allproduct, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      // params: {
      //   email
      // }
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}

 async function Dataprice(data, id = null) {
   const res = await (id
     ? axios.put(apiEndpointFunction.selectedproductdata(id), data, {
         headers: authHeader(),
       })
     : axios.post(apiEndpoint.selectedproductdata, data, {
         headers: authHeader(),
       }));
   if (res && res.status === 200) {
     return res.data;
   }
   return {};
 }

function registers(data) {
  return axios
    .post(apiEndpoint.register, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
    });
}