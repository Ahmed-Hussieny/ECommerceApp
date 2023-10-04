import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASEURL from "../BaseUrl";

export let getAllBrands = createAsyncThunk('Brands/getAllBrands',async()=>{
    let {data} =await axios.get(`${BASEURL}brands`);
    return data.data
})


let BrandsSlice = createSlice({
    name:'Brands',
    initialState:{
        BrandsList:[]
    },
    extraReducers:(x)=>{
        x.addCase(getAllBrands.fulfilled,(state,action)=>{
            state.BrandsList = action.payload

        })
    }
})

export let BrandsReduser = BrandsSlice.reducer