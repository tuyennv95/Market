import axios from 'axios';
// import queryString from 'query-string';
const axiosConfig = axios.create({
    baseURL: 'http://localhost:8090',
    // headers:{
    //     'content-type': 'application/json',

    // },
    // paramsSerializer: params => queryString.stringify(params),
});
// axiosConfig.interceptors.request.use((config) =>{
//     const token = localStorage.getItem('token');
//     if(token){
//         config.header.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
axiosConfig.interceptors.request.use(async (config) => {
    const customHeaders = {};
  
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      customHeaders.Authorization = `Bearer ${accessToken}`;
    }
  
    return {
      ...config,
      headers: {
        ...customHeaders,  // auto attach token
        ...config.headers, // but you can override for some requests
      }
    };
});
// axiosConfig.interceptors.request.use((response)=>{
//     if(response && response.data){
//         return response.data;
//     }
//     return response;
// },(error)=>{
//         throw error;
// });
export default axiosConfig;