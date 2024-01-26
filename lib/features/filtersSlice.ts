import { createSlice } from '@reduxjs/toolkit'
import {RootState} from "@/lib/store";

export type FiltersSlice = {
    filterCategories: Array<string>
}
const initialState: FiltersSlice = {
    filterCategories: []
}
export const filterSlice = createSlice({
    name: 'filters',
   initialState,
    reducers: {
        setFilterCategories(state, action: { payload: Array<string>; type: string }) {
            state.filterCategories = action.payload;
        },
    },
})

export const selectFilterCategories = (state: RootState) => state.filters.filterCategories;

export const { setFilterCategories } = filterSlice.actions

export default filterSlice.reducer