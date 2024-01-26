import { configureStore } from "@reduxjs/toolkit";
import {filterSlice} from "@/lib/features/filtersSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            filters: filterSlice.reducer
        },
        devTools: process.env.NODE_ENV !== "production",
    });

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']