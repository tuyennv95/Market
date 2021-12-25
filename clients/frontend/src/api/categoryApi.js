import axiosConfig from "./axiosConfig";

const categoryApi = {
    getData(){
        const url = 'v1/category/public';
        return axiosConfig.get(url);
    }
}
export default categoryApi;