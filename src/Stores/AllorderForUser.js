import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASEURL from "../BaseUrl";
let userId = localStorage.getItem('userId');

export let GetAllUserOrder = createAsyncThunk('Allorder/GetAllUserOrder',async()=>{
    // /{{BaseUrl}}api/v1/orders/user/6407cf6f515bdcf347c09f17
    let data=await axios.get(`${BASEURL}orders/user/${userId}`)
    console.log(data.data);
    console.log("hnaaa")
    return data.data
})


let AllOrderSlice = createSlice({
    name:"Allorder",
    initialState:{
        allOrderList:[]
    },
    extraReducers:(x)=>{
        x.addCase(GetAllUserOrder.fulfilled,(state,action)=>{
            state.allOrderList=action.payload
        })
    }
})
export let AllOrderReducer =AllOrderSlice.reducer