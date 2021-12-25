import axios from "axios";


const http = axios.create({
  baseURL: "https://localhost:8090",
});

export const registrationApi = (data, config) => {
    return http.post("/v1/customer/registration", data, config);
  
  };
export const getUser = (data) =>{
  return http.post("/authenticate", data)
}