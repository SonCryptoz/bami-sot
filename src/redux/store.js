import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import orderSlice from "./slices/orderSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ["product"],
};

const userPersistConfig = {
    key: "user",
    storage,
    blacklist: ["token", "password"], // Loại trừ các field nhạy cảm
};

const rootReducer = combineReducers({
    product: productSlice,
    user: persistReducer(userPersistConfig, userSlice),
    order: orderSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
