import {  LOG_IN, LOG_OUT} from "constan/types";
const initState = {
    loginError: '',
    token: '',

}
const token = localStorage.getItem('token');
if(token){
    initState.token = token;
}
 const AuthReducer = (state = initState, action) => {
     const {type, payload} = action;
     switch(type){
        case LOG_IN:
            return {...state, token: payload};
        case LOG_OUT:
            return {...state, token: '' , loginError: ''};
         default:
             return state;
     }
 }
 export default AuthReducer;