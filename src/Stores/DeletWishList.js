import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASEURL from "../BaseUrl";

// {{BaseUrl}}/api/v1/wishlist
// {{BaseUrl}}/api/v1/wishlist/61e81f641904360ec15c6db1

export let deleteSpacificProductFromWishList = createAsyncThunk('WishListDelet/deleteSpacificProductFromWishList',async(id)=>{
    let headers={
        token: localStorage.getItem("userToken")
    }
    let {data}=await axios.delete(`${BASEURL}wishlist/${id}`,{headers})
    return data
})






let WishListDelSlice = createSlice({
    name:"WishListDelet",
    initialState:{
        deleteMessage:""
    },
    extraReducers:(x)=>{

        x.addCase(deleteSpacificProductFromWishList.fulfilled,(state,action)=>{
            state.deleteMessage=action.payload
        })
    }
})

export let  wishListDelReducer = WishListDelSlice.reducer