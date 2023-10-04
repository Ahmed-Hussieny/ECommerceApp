import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASEURL from "../BaseUrl";

export let AddWishList = createAsyncThunk('AddWish/AddWishList',async(id)=>{
    let headers={
        token: localStorage.getItem("userToken")
    };
   let body={
        "productId": id
         };
    let {data}=await axios.post(`${BASEURL}wishlist`,body,{headers})
    return data
})

let AddWishListSlice = createSlice({
    name:'AddWish',
    initialState:{
        AddMessage:""
    },
  extraReducers:(x)=>{
    x.addCase(AddWishList.fulfilled,(state,action)=>{
        state.AddMessage=action.payload
    })
  }
})


export let  wishListADDReducer = AddWishListSlice.reducer