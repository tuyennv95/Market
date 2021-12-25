import axiosConfig from "./axiosConfig";
const userApi = {
  register(data) {
    const url = "/v1/customer/registration";
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
};
export default userApi;
