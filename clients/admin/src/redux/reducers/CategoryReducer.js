import { GET_CATEGORY,SET_ERROR_CATEGORY,SET_CATEGORY_DETAIL, REMOVE_ERROR_CATEGORY } from "constan/types";
const initState = {
    listCategory: null,
    err: '',
    categoryDetail: null,
}
const CategoryReducer = (state = initState, action) =>{
    const {type, payload} = action;
    switch(type){
        case GET_CATEGORY: 
            return {...state, listCategory: payload}
        case SET_ERROR_CATEGORY: 
            return {...state, err: payload}
        case REMOVE_ERROR_CATEGORY: return {...state, err: ''}
        case SET_CATEGORY_DETAIL: return {...state, categoryDetail:payload}
        default: return state;
    }
}
export default CategoryReducer;