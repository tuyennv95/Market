import {
  HIDDEN_LOAD,
  SET_LOAD,
  SET_USER,
  SET_ERROR_USER,
  REMOVE_ERROR,
  SET_REDIRECT,
  GET_USER
} from "constan/types";
import userApi from "config/userApi";

export const getAllCustomer = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOAD });
    try {
      const listUser = await userApi.getCustomers(data);
      dispatch({ type: SET_USER, payload: listUser.data });
      dispatch({ type: REMOVE_ERROR });

      dispatch({ type: HIDDEN_LOAD });
    } catch (err) {
      dispatch({ type: SET_ERROR_USER, payload: err });
      dispatch({ type: HIDDEN_LOAD });
    }
  };
};
export const registerUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOAD });
    try {
      const reg = await userApi.registerUser(data);
      dispatch({ type: REMOVE_ERROR });
      dispatch({ type: SET_REDIRECT });
      dispatch({ type: HIDDEN_LOAD });
    } catch (err) {
      dispatch({ type: SET_ERROR_USER, payload: err });
      dispatch({ type: HIDDEN_LOAD });
    }
  };
};
export const deleteUser = (data) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOAD})
        try{
            const del = await userApi.deleteUser(data);
            dispatch({ type: HIDDEN_LOAD})
        }
        catch(err){
        }
    }
}
export const getUserDetail = (data) =>{
    return async (dispatch) => {
        dispatch({ type: SET_LOAD })
        try{
            const detailUser = await userApi.getUserDetail(data);
            dispatch({ type: GET_USER, payload: detailUser.data.result})
            dispatch({ type: REMOVE_ERROR });
            dispatch({ type: HIDDEN_LOAD})

        }
        catch(err){
            dispatch({ type: SET_ERROR_USER, payload: err });
            dispatch({ type: HIDDEN_LOAD });
        }
    }
}
export const editUser = (data) =>{
    return async (dispatch) => {
        dispatch({ type: SET_LOAD });
        try{
            const edit = await userApi.editUser(data);
            console.log('🚀 ~ edit', edit);
            dispatch({ type: REMOVE_ERROR });
            dispatch({ type: SET_REDIRECT });
            dispatch({ type: HIDDEN_LOAD });
        }
        catch(err){
            dispatch({ type: HIDDEN_LOAD });

        }
    }
}
