import axios from "axios";
import { apiEndpoint, apiEndpointFunction } from "../library/endpoint";
import { authHeader } from "../library/authHeader";
import { json } from "react-router-dom";

export const MyUploadService = {
    Postmyupload,
    Getmyupload,
    Myuploaddel,
};

function Postmyupload(data) {
    return axios
        .post(apiEndpoint.myupload, data, {
            headers: authHeader(),
        })
        .then((res) => {
            if (res && res.status === 200) {
                return res.data;
            }
        })
        .catch((error) => {
            console.error("Upload Error:", error);
        });
}

// async function Getmyupload() {
//     try {
//         console.log("Fetching from:", apiEndpoint.getmyupload);
//         const res = await axios.get(apiEndpoint.getmyupload, {
//             headers: authHeader(),
//         });
//         console.log("API Response:", res);
//         return res.data;
//     } catch (error) {
//         console.error("Error fetching uploads:", error.response ? error.response.data : error.message);
//         return null;
//     }
// }

function Getmyupload() {
    return (
        axios
            .get(
                apiEndpoint.getmyupload,
                {
                    headers: authHeader(),
                }
            ).then(res => {
                if (res && res.status === 200) {
                    return res.data;
                }
            })
    );
}

function Myuploaddel(id) {
    return axios
        .delete(apiEndpointFunction.myuploaddel(id), {
            headers: authHeader(),
        })
        .then((res) => {
            if (res && res.status === 200) {

                return res.data;
            }
        });
}
