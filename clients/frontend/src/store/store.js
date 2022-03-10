import { combineReducers, configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer,persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import userReducer from './userSlice';
import productsReducer from './productsSlice';
import { applyMiddleware } from 'redux';
import thunkMiddleware  from 'redux-thunk';
import cartReducer from './cartSlice';
import productCountReducer from './productCountSlice';
import orderReducer from './orderSlice';

const middlewares = [thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers);

const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
    count: productCountReducer,
    order: orderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user', 'cart', 'products'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer : persistedReducer,
  middleware : getDefaultMiddleware ( { 
    serializableCheck : false , 
  } ),
  composedEnhancers,
});
export const persistor =  persistStore(store)