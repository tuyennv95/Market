import { GET_PRODUCTS } from "constan/types"; 
const initState = {
    products: null,
}
const ProductReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_PRODUCTS:
            return {product: payload};
        default: return state;

    }
}
export default ProductReducer;