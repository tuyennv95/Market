import axiosConfig from "./axiosConfig";

const productsApi = {
    getCountProducts(data){
        const url = '/v1/product/public/count';
        return axiosConfig.post(url, data);
    },
    getProducts(data){
        const url = '/v1/product/public/pageable';
        return axiosConfig.post(url, data);
    },
    getProductDetail(id){
        const url = `/v1/product/public/${id}`;
        return axiosConfig.get(url);
    },
    getTopBuy(){
        const url = "/v1/product/public/top-buy";
        return axiosConfig.get(url);
    }
}
export default productsApi;