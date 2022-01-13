import {SET_LOAD, HIDDEN_LOAD,SET_REDIRECT,CANCEL_REDIRECT} from 'constan/types'
const initState = {
    isLoading: false,
    redirect: false,
}
const LoadingReducer = (state = initState, action) =>{
    switch(action.type){
        case SET_LOAD:
            return {...state, isLoading: true}
        case HIDDEN_LOAD:
            return {...state, isLoading: false}
        case SET_REDIRECT:
            return {...state, redirect: true}
        case CANCEL_REDIRECT:
            return {...state, redirect: false}
        default: return state
    }
}
export default LoadingReducer;