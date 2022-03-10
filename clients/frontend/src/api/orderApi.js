import axiosConfig from "./axiosConfig";

const orderApi = {
    getOrders(data){
        const url = '/v1/order/pageable';
        const token = localStorage.getItem('token');
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        return axiosConfig.post(url, data, config);
    },
    getOrder(data){
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url=`/v1/order/${data}`;
      return axiosConfig.get(url, config)
    },
    createOrder(data){
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "/v1/order/customer"
      return axiosConfig.post(url,data, config)
    },
    huyOrder(data){
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "/v1/order"
      return axiosConfig.put(url,data, config)
    },
    getAddress(){
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "/v1/order/customer/get-address-history"
      return axiosConfig.get(url, config)
    },
}
export default orderApi;