import { createStore,applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from 'redux/reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CategoryReducer from 'redux/reducers/CategoryReducer';
import OrderReducer from 'redux/reducers/OrderReducer';
const persistConfig = {
    key: 'reducer',
    storage: storage,
    whitelist: ['CategoryReducer', 'OrderReducer'] // or blacklist to exclude specific reducers
 };
 const presistedReducer = persistReducer(persistConfig, rootReducer );
const middlewares = [thunkMiddleware];
const store = createStore(
    presistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
    )
    const persistor = persistStore(store);
export { store, persistor};