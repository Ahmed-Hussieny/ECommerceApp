import axios from "axios";
import { createContext, useEffect, useState } from "react";
import BASEURL from "../BaseUrl";
import { ErrorData } from "../Components/ErrorData/ErrorData";

export let CartContext = createContext();
export function CartContextProvider(props){

    let [cartCount,setCartCount]=useState(0);
        let headers={
        token: localStorage.getItem("userToken")
    }
     
    async function getAllCart() {

        try {
          const response = await axios.get(`${BASEURL}cart`, { headers });
          
          if (response.data) {
            return response;
          } else {
            return ErrorData
            
          }
        } catch (error) {
          if(error){return ErrorData}
        //   throw error;
        }
      }
    // async function getcount(){
    //     // console.log("kkkkk")
    //     if(localStorage.getItem("userToken")){
    //         // console.log("geh")
    //          return axios.get(`${BASEURL}cart`,{headers}).then((res)=>{
    //      setCartCount(res.data.numOfCartItems)
         
    //     })
    //     }else{
    //         // console.log("No")
    //     }
       
    //  }
    useEffect(()=>{
        // getcount()
    },[])


    function deleteproduct(id){
        let headers={
            token: localStorage.getItem("userToken")
        }
        return axios.delete(`${BASEURL}cart/${id}`,{headers})
    }


    function UpdateCounter(id,count){
        let body={
            "count":count
        }
        let headers={
            token: localStorage.getItem("userToken")
        }
        return axios.put(`${BASEURL}cart/${id}`,body,{headers})
    }


    function deleteAllProducts(){
        let headers={
        token: localStorage.getItem("userToken")
    }
    
    return axios.delete(`${BASEURL}cart`,{headers})
    }
    function AddToCart(id){
        let body={
                "productId": id
        }
        let headers={
            token: localStorage.getItem("userToken")
        }
        return axios.post(`${BASEURL}cart`,body,{headers})
    }

    function checkPayment(id,sheppingData){
        let body={
            "shippingAddress":sheppingData
        }
        let headers={
            token: localStorage.getItem("userToken")
        }
       return axios.post(`${BASEURL}orders/checkout-session/${id}?url=http://localhost:3000`,body,{headers})
    }

    function checkPaymentCash(id,sheppingData){
        let body={
            "shippingAddress":sheppingData
        }
        let headers={
            token: localStorage.getItem("userToken")
        }
       return axios.post(`${BASEURL}orders/${id}`,body,{headers})
    }

    return <CartContext.Provider value={{cartCount,setCartCount,checkPaymentCash,AddToCart,getAllCart,deleteproduct,deleteAllProducts,UpdateCounter,checkPayment}}>
        {props.children}
    </CartContext.Provider>
}
