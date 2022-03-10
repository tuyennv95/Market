import {SET_LOAD, SET_REDIRECT ,SET_CATEGORY_DETAIL, HIDDEN_LOAD, GET_CATEGORY,SET_ERROR_CATEGORY, REMOVE_ERROR_CATEGORY} from 'constan/types';
import categoryApi from 'config/categoryApi';

export const getAllCategory  = (data) => {
    return async (dispatch) =>{
        dispatch({ type: SET_LOAD })
        try{
            const get = await categoryApi.getCategory(data);
            dispatch({ type: GET_CATEGORY, payload: get.data});
            dispatch({ type: HIDDEN_LOAD})
        }
        catch(err){}
    }
}
export const createCategoryAct = (data) =>{
    return async (dispatch) => {
        dispatch({ type: SET_LOAD})
        try{
            const create = await categoryApi.createCategory(data);
            dispatch({ type:SET_REDIRECT})
            dispatch({ type: REMOVE_ERROR_CATEGORY})
            dispatch({ type: HIDDEN_LOAD})

        }
        catch(err){
            dispatch({ type: SET_ERROR_CATEGORY, payload: err})
            dispatch({ type: HIDDEN_LOAD})
        }
    }
}
export const deleteCategoryAct = (data) =>{
    return async (dispatch) => {
        dispatch({ type: SET_LOAD })
        try{
            const del = await categoryApi.deleteCategory(data);
            dispatch({ type: REMOVE_ERROR_CATEGORY})
            dispatch({ type: HIDDEN_LOAD})
            window.location.reload()
        }
        catch(error){

            dispatch({ type: SET_ERROR_CATEGORY, payload: error.response.data.message })
            dispatch({ type: HIDDEN_LOAD})
            dispatch({ type: REMOVE_ERROR_CATEGORY})

        }
    }
}
export const getCategoryDetail = (data) =>{
    return async (dispatch) => {
        dispatch({ type: SET_LOAD})
        try{
            const getDetail = await categoryApi.getCateDetail(data); 
            dispatch({ type: SET_CATEGORY_DETAIL, payload: getDetail.data.result });
            dispatch({ type: REMOVE_ERROR_CATEGORY})
            dispatch({ type: HIDDEN_LOAD})
        }
        catch(error){
            dispatch({ type: SET_ERROR_CATEGORY, payload: error})
            dispatch({ type: HIDDEN_LOAD})
        }
    }
}
export const editCategoryAct = (data) =>{
    return async (dispatch) =>{
        dispatch({ type: SET_LOAD })
        try{
            const editCate = await categoryApi.editCategory(data);
            dispatch({ type:SET_REDIRECT})
            dispatch({ type: REMOVE_ERROR_CATEGORY})
            dispatch({ type: HIDDEN_LOAD})
        }
        catch(error){
            dispatch({ type: SET_ERROR_CATEGORY, payload: error})
            dispatch({ type: HIDDEN_LOAD})
        }
    }
}