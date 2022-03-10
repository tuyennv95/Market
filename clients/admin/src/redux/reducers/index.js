import ThemeReducer from "./ThemeReducer"
import { combineReducers } from "redux"
import AuthReducer from "./AuthReducer";
import CustomerReducer from "./CustomerReducer";
import LoadingReducer from "./LoadingReducer"
import ProductReducer from "./ProductReducer";
import CategoryReducer from "./CategoryReducer"
import OrderReducer from "./OrderReducer"
const rootReducer = combineReducers({
    ThemeReducer,
    AuthReducer,
    CustomerReducer,
    LoadingReducer,
    ProductReducer,
    CategoryReducer,
    OrderReducer,
})

export default rootReducer