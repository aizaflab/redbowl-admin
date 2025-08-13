import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./auth/authSlice";
import { apiSlice } from "./api/apiSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    middleware: (gDm) => gDm().concat(apiSlice.middleware)
})

setupListeners(store.dispatch);
