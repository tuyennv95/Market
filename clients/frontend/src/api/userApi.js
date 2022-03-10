import axiosConfig from "./axiosConfig";
const userApi = {
  register(data) {
    const url = "/v1/customer/public/registration";
    return axiosConfig.post(url, data);
  },
  login(data) {
    const url = `/authenticate?username=${data?.username}&password=${data?.password}`;
    const config = {
      headers: {
        clientId: "customer",
      },
    };
    return axiosConfig.post(url, {}, config);
  },
  changePass(data){
    const url="/v1/customer/customer/update-password";
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axiosConfig.post(url, data, config)
  },
  editLove(productCode){
    const url = `/v1/customer/customer/favorite/${productCode}`;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axiosConfig.get(url, config)
  }
};
export default userApi;
