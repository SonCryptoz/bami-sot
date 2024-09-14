import { configureStore } from "@reduxjs/toolkit";
import counterSlide from "./slices/counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlide,
    },
});
