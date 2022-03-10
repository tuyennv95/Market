import axiosConfig from "./axiosConfig";

const productApi = {
    getProducts(data){
        const url="/v1/product/public/pageable";
        return axiosConfig.post(url, data)
    },
    createProduct(data){
        const url = "/v1/product/private";
        return axiosConfig.post(url, data)
    },
    deleteProduct(data){
        const url = `/v1/product/private/${data}`;
        return axiosConfig.delete(url)
    },
    getProduct(data){
        const url=`/v1/product/public/${data}`;
        return axiosConfig.get(url);
    },
    updateProduct(data){
        const url = "/v1/product/private";
        return axiosConfig.put(url, data);
    },
    getCountProduct(data){
        const url="/v1/product/public/count";
        return axiosConfig.post(url, data)
    }
}
export default productApi;