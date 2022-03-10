import axiosConfig from "./axiosConfig";

const categoryApi = {
    getCategory(data){
        const url="/v1/category/private/pageable";
        return axiosConfig.post(url, data);
    },
    createCategory(data){
        const url = "/v1/category/private";
        return axiosConfig.post(url, data);
    },
    deleteCategory(data){
        const url = `/v1/category/private/${data}`;
        return axiosConfig.delete(url)
    },
    getCateDetail(data){
        const url =`/v1/category/private/${data}`;
        return axiosConfig.get(url)
    },
    editCategory(data){
        const url="/v1/category/private"
        return axiosConfig.put(url,data);
    }
}
export default categoryApi;