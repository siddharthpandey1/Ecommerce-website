import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import productSlice from "./productSlice"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storageModule from "redux-persist/lib/storage";
const storage = storageModule.default;
console.log("storage:", storage);
console.log(storage);
console.log(typeof storage.getItem);
console.log(typeof storage.setItem);

const persistConfig = {
    key:'root',
    version:1,
    storage,
}
const rootReducer = combineReducers({
    user:userSlice,
    product:productSlice
})
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),      
})
export default store