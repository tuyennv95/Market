import { SET_USER,SET_ERROR_USER,REMOVE_ERROR,GET_USER  } from "constan/types";

const initState = {
    listUsers: null,
    err: null,
    user: null,
};

const CustomerReducer =  (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_USER:
            return {listUsers: payload}
        case SET_ERROR_USER:
            return {...state, err: payload}
        case REMOVE_ERROR:
            return {...state, err: null}
        case GET_USER:
            return {...state, user: payload}
        
        default: return state;
    }
}
export default CustomerReducer;