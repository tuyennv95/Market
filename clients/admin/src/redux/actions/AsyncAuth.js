import { SET_LOAD, LOG_IN ,HIDDEN_LOAD} from "constan/types";
import userApi from 'config/userApi';
export const login = (user) =>{
    return async (dispatch) =>{
        dispatch({type: SET_LOAD})
        try{
            const data = await userApi.login(user);
            console.log('🚀 ~ data', data);
            dispatch({type: HIDDEN_LOAD});
            localStorage.setItem('token', data.data.result);
            dispatch({type: LOG_IN, payload: data.data.result})
        }
        catch(err){}
    }
}