import axiosConfig from "./axiosConfig";

const productApi = {
    getProducts(data){
        const url="/v1/product/public/pageable";
        return axiosConfig.post(url, data)
    }
}
export default productApi;