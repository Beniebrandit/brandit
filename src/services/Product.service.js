import axios from "axios";
import { apiEndpoint, apiEndpointFunction } from "../library/endpoint";
import { authHeader } from "../library/authHeader";


export const ProductService = {
  product,
  Dataprice,
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