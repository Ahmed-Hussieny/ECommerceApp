import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASEURL from "../BaseUrl";

// {{BaseUrl}}/api/v1/wishlist
// {{BaseUrl}}/api/v1/wishlist/61e81f641904360ec15c6db1



export let GetAllWishList=createAsyncThunk('WishList/GetAllWishList',async ()=>{
    let headers={
        token: localStorage.getItem("userToken")
    }
    let {data}=await axios.get(`${BASEURL}wishlist`,{headers})
    return data.data
})



let WishListSlice = createSlice({
    name:"WishList",
    initialState:{
        WishListAllData:[],
    },
    extraReducers:(x)=>{
        x.addCase(GetAllWishList.fulfilled,(state,action)=>{
            state.WishListAllData = action.payload

        })
      
    }
})

export let  wishListReducer = WishListSlice.reducer