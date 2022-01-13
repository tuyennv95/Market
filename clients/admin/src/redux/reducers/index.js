import ThemeReducer from "./ThemeReducer"
import { combineReducers } from "redux"
import AuthReducer from "./AuthReducer";
import CustomerReducer from "./CustomerReducer";
import LoadingReducer from "./LoadingReducer"
import ProductReducer from "./ProductReducer";
const rootReducer = combineReducers({
    ThemeReducer,
    AuthReducer,
    CustomerReducer,
    LoadingReducer,
    ProductReducer,

})

export default rootReducer