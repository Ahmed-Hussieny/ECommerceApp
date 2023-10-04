import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASEURL from "../BaseUrl";
import axios from "axios";


// let {data} = await axios.get(`${BASEURL}categories`);

export let GetAllCategory = createAsyncThunk('Category/GetAllCategory', async () => {
    let { data } = await axios.get(`${BASEURL}categories`);
    return data.data
})

let CategorySlice = createSlice({
    name: 'Category',
    initialState: { CategoryList: []},
    extraReducers: (x) => {
        x.addCase(GetAllCategory.fulfilled, (state, action) => {
            state.CategoryList = action.payload
        })
    }
})
export let CatgoryReducer = CategorySlice.reducer