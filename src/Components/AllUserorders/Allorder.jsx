// allorders

import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllUserOrder } from '../../Stores/AllorderForUser'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
export default function Allorder() {
  let {setCartCount}=useContext(CartContext);
    let disp = useDispatch()
let {allOrderList}=useSelector((x)=>x.AllOrderData)
useEffect(()=>{
    $(".loading").fadeIn(1000);

    disp(GetAllUserOrder())
    setCartCount(0)
    $(".loading").fadeOut(1000);
    
},[])
let order=1;
// console.log(allOrderList)
  return (
  <>
    <div className='loading position-fixed top-0 bottom-0 end-0 start-0 '>
    <span className="loader"></span>
    </div>
  {allOrderList.map((el,i)=>{
    return   <div key={el._id} className='my-3 bg-light p-3'>
    <div className='d-flex justify-content-between'>
    <h1 className='fw-bold'>Order {i+1}</h1>
    <h2 className='fw-bold text-success'>List Of Products </h2>
    </div>
    <div className='row'>
    {el.cartItems.map((el)=>{
        return <div key={el.product._id} className='col-md-3 my-3 '>
            <Link className='text-decoration-none d-inline' to={'/product/' + el.product._id}>
        <div className="">
            <img src={el.product.imageCover} className='w-100 '  alt="" />
            <div className='bg-white text-center'>
       <h4 className='text-black'>{el.product.title.split(" ").splice(0,1).join(" ")}</h4>
       </div>
        </div>
          </Link>
        </div>
    
       
   
    })}
     </div>

    <div className='d-flex justify-content-between'>
        <p><span className='fw-bold'>Date : </span>{el.createdAt.split("").splice(0,10).join("")}</p>
        <p><span className='fw-bold'>Deliverd : </span>{el.isDelivered?<i class="fa-solid fa-square-check"></i>:<i className="fa-solid fa-truck-fast"></i>}</p>
    </div>
    <div className='d-flex justify-content-between'>
        <p><span className='fw-bold'>Payed : </span>{el.isPaid?<i class="fa-solid fa-square-check text-success fs-4"></i>:<i className="fa-solid fa-x text-danger"></i>}</p>
        <p><span className='fw-bold'>Method of Payment : </span><span className='text-success fw-bold'>{el.paymentMethodType}</span></p>
    </div>

  
</div>
  })}
  </>
  )
}
