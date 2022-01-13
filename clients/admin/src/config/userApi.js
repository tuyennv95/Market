import axiosConfig from "./axiosConfig";

const userApi = {
  login(data) {
    const url = `/authenticate?username=${data?.email}&password=${data?.password}`;
    const config = {
      headers: {
        contentType: "application/json",
        clientId: "employee",
      },
    };
    return axiosConfig.post(url, {}, config);
  },
  getCustomers(data){
    const url = "/v1/customer/private/pageable";
    
    return axiosConfig.post(url, data)
  },
  registerUser(data){
    const url = "/v1/customer/public/registration";
    return axiosConfig.post(url, data);
  },
  deleteUser(data){
    const url = `/v1/customer/private/${data}`;
    return axiosConfig.delete(url);
  },
  getUserDetail(data){
    const url = `/v1/customer/private/${data}`;
    return axiosConfig.get(url);
  },
  editUser(data){
    const url = "/v1/customer/private";
    return axiosConfig.put(url, data);
  }
};
export default userApi;
