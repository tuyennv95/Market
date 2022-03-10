import { GET_PRODUCTS,REMOVE_ERR_PRODUCT,  ERR_PRODUCT, GET_PRODUCT } from "constan/types"; 
const initState = {
    products: null,
    err: '',
    product: null,
    
}
const ProductReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_PRODUCTS:
            return {...state, products: payload};
        case REMOVE_ERR_PRODUCT:
            return {...state, err: ''}
        case ERR_PRODUCT:
            return {...state, err: payload}
        case GET_PRODUCT:
            return {...state, product: payload} 
        default: return state;

    }
}
export default ProductReducer;