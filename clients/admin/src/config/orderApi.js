import axiosConfig from "./axiosConfig";

const orderApi = {
    getOrders(data){
        const url="/v1/order/pageable";
        return axiosConfig.post(url, data)
    },
    deleteOrder(data){
        const url=`/v1/order/${data}`;
        return axiosConfig.delete(url)

    },
    getOrder(data){
        const url = "/v1/order/codes";
        return axiosConfig.post(url, data)
    },
    editOrder(data){
        const url = "/v1/order";
        return axiosConfig.put(url, data)
    },
    getCountOrder(data){
        const url="/v1/order/count";
        return axiosConfig.post(url, data)
    }
    
}
export default orderApi;