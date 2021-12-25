import axiosConfig from "./axiosConfig";

const productsApi = {
    getCountProducts(data){
        const url = '/v1/product/public/count';
        return axiosConfig.post(url, data);
    },
    getProducts(data){
        const url = '/v1/product/public/pageable';
        return axiosConfig.post(url, data);
    }
}
export default productsApi;