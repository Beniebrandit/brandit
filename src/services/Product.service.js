import axios from "axios";
import { apiEndpoint, apiEndpointFunction } from "../library/endpoint";

export const ProductService = {
  product,
  Dataprice,
};

function product(){
    const token = `6|q8mTawTdGKbRdLazOGLcm1Y0zJe5ks4IPUWRJNIR13495c0c`
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

function Dataprice(id, data) {
      const token = `6|q8mTawTdGKbRdLazOGLcm1Y0zJe5ks4IPUWRJNIR13495c0c`;
  return axios
    .post(`${apiEndpointFunction.selectedproductdata(id)}`, data, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res && res.status === 200) {
        return res.data;
      }
      return {};
    });
}