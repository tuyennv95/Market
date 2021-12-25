import axios from 'axios';
import queryString from 'query-string';
const axiosConfig = axios.create({
    baseURL: 'http://localhost:8090',
    headers:{
        'content-type': 'application/json',

    },
    paramsSerializer: params => queryString.stringify(params),
});
// axiosConfig.interceptors.request.use((config) =>{
    // const token = localStorage.getItem('aa',jwt);
    // if(token){
    //     config.header.Authorization = `Bearer ${token}`;
    // }else{
    //     config.header.clientId = 'employee';
    // }
    // return config;
// });

// axiosConfig.interceptors.request.use((response)=>{
//     if(response && response.data){
//         return response.data;
//     }
//     return response;
// },(error)=>{
//         throw error;
// });
export default axiosConfig;