import React, { useEffect, useState } from 'react'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Cart from './Components/Cart/Cart';
import WishList from './Components/WishList/WishList';
import Product from './Components/Product/Product';
import Categories from './Components/Categoties/Categories';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import ProtectRouting from './Components/ProtectRouting/ProtectRouting';
import Login from './Components/Login/Login';
import jwtDecode from 'jwt-decode';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Products from './Components/Products/Products';
import { CartContextProvider } from './Context/CartContext';
import CheckOut from './Components/CheckOut/CheckOut';
import { Provider } from 'react-redux';
import { ConfigurationStore } from './Stores/Stores';
import Allorder from './Components/AllUserorders/Allorder';
import NotFound from './Components/NotFound/NotFound';





export default function App() {


  let [userData,setUserData]=useState(null);

  function saveUserData(data){
    setUserData(data);
    // console.log(data);
  }
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      // lw f data hatha w fokha w eb3atha jwt decode
      let token=localStorage.getItem("userToken");
     let data = jwtDecode(token);
     setUserData(data);
    //  console.log(data);
    //  localStorage.setItem('userId',(userData.id));

    // console.log();
    }
  },[])

  function SignOut(){
    let nav = useNavigate();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setUserData(null);
    nav("/login");
  }

  let routes = createBrowserRouter([
    {path:"",element:<Layout userData={userData}/>,children:[
      {index:true,element:<ProtectRouting><Home/></ProtectRouting>},
      {path:'home',element:<ProtectRouting><Home/></ProtectRouting>},
      {path:'cart',element:<ProtectRouting><Cart/></ProtectRouting>},
      {path:'wish_list',element:<ProtectRouting><WishList/></ProtectRouting>},
      {path:'product/:id',element:<ProtectRouting><Product/></ProtectRouting>},
      {path:'allorders',element:<ProtectRouting><Allorder/></ProtectRouting>},
      {path:'products',element:<ProtectRouting><Products/></ProtectRouting>},
      {path:'categories',element:<ProtectRouting><Categories/></ProtectRouting>},
      {path:'signout',element:<ProtectRouting><SignOut/></ProtectRouting>},
      {path:'Brands',element:<ProtectRouting><Brands/></ProtectRouting>},
      {path:'checkout/:id',element:<ProtectRouting><CheckOut/></ProtectRouting>},
      {path:'login',element:<Login saveUserData={saveUserData}/>},
      {path:'register',element:<Register/>},
      {path:'forgetpassword',element:<ForgetPassword/>},
      {path:'resetPassword',element:<ResetPassword/>},
      {path:'*',element:<NotFound/>},
    ]}
  ])
  
  return (
    <div>
      <Provider store={ConfigurationStore}>
      <CartContextProvider>
        <RouterProvider router={routes}/>
      </CartContextProvider>
      </Provider>



    </div>
  )
}

