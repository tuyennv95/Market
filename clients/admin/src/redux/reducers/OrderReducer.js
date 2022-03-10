import { SET_ORDER, SET_ERR_ORDER, REMOVE_ERROR_ORDER, SET_LOAD, REMOVE_LOAD,SET_DETAIL_ORDER,SET_ERR_ORDER_EDIT ,REMOVE_ERROR_ORDER_EDIT} from "constan/types";

const initState = {
    orders: [],
    err: '',
    errEdit: null,
    order: null,
}
const OrderReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_ORDER:
            return {...state, orders: [...payload]}
        case SET_ERR_ORDER:
            return {...state, err: payload}
        case REMOVE_ERROR_ORDER: return {...state, err: ''}
        case SET_ERR_ORDER_EDIT:
            return {...state, errEdit: payload}
        case REMOVE_ERROR_ORDER_EDIT: return {...state, errEdit: null}

        case SET_DETAIL_ORDER: return {...state, order: payload}
        
        default: return state;
    }
}
export default OrderReducer;