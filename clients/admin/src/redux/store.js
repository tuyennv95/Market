import { createStore,applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from 'redux/reducers/index';


const middlewares = [thunkMiddleware];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
    )
export default store;