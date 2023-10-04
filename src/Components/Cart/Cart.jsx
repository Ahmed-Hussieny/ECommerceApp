import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import $ from 'jquery'
import { ErrorData } from '../ErrorData/ErrorData';
export default function Cart() {
  let [cartData,setCartData] = useState(null)
  let [p,setP] = useState('')
  let [Totalcount ,setTotalCount]=useState(-1);
  let {getAllCart,deleteproduct,UpdateCounter,setCartCount,cartCount}=useContext(CartContext);
  let k=0;
// let nav = useNavigate();

 async function deletespecificProduct(id){
    let {data} = await deleteproduct(id);
    // console.log("dddddd");
    // console.log(data)
    // setCartData(data.data)
    // setTotalCount(data.numOfCartItems)
    setCartCount(data.numOfCartItems)
    if(p==='item'){
      toast.success("product Deleted",{className:"alert bg-success fw-bold text-white",position:"top-right"});
    }
    if(p==="cart" && k==0){
      toast.success("Cart Deleted",{className:"alert bg-success fw-bold text-white",position:"top-right"});
      k=10;
    }
    getAllCartData();
      //  console.log( cartData.products.length)
  }
  function deletItem(id){
    $(".loading").fadeIn(1000);
    setP('item')
    deletespecificProduct(id)
    $(".loading").fadeOut(1000);
      
  }
function deleteAllProductsList(){
  k=0;
  setP('cart')
  $(".loading").fadeIn(1000);
  cartData.products.forEach(async(el)=>{
    await deletespecificProduct(el.product.id)
  })
 
    // {cartData.products.map((el)=>{
    //   let {data} = await;
    //   deletespecificProduct(el.product.id)
    // })}
    // setCartData(null)
    // let {data} = await deleteAllProducts();
    // console.log(data)
    // if(data.message=="success"){
    //   setCartData(null);
    //   setTotalCount(0);
    // }else{
      deletLastelment();
    // }

    // console.log("etmasz");
    setCartCount(0)
    $(".loading").fadeOut(1000);
  }
  function deletLastelment(){
    $(".loading").fadeIn(1000);
    getAllCartData();
    $(".loading").fadeOut(1000);
  }
  async function upadateCount(id,count){
    $(".loading").fadeIn(1000);
    let {data}= await UpdateCounter(id,count);
    setCartData(data.data)
    if(count==0){
      deletespecificProduct(id)
      setP('item')
    }
    setTotalCount(data.numOfCartItems)
    // console.log(data.data);
    $(".loading").fadeOut(1000);
   }

  async function getAllCartData(){
    $(".loading").fadeIn(1000);
   let {data} = await getAllCart();
   if(data.__v!= 10000){
    setCartData(data.data)
    setTotalCount(data.numOfCartItems)
      //  console.log(data);
   }else{
      setCartData(ErrorData)
      setTotalCount(0)
  //  console.log("jjjjjj")
   }
  //  console.log(data);
  $(".loading").fadeOut(1000);

  }
  useEffect(()=>{
   
    $(".loading").fadeIn(1000);
    getAllCartData() 
    // setCartData(ErrorData.data)
    $(".loading").fadeOut(1000);
  },[])
  return ( 
  <>
      <div className='loading position-fixed top-0 bottom-0 end-0 start-0 '>
    <span className="loader"></span>
    </div>
  <Toaster/>
    {(cartData)?
    <div className='bg-light p-4 my-4'>
    
      <div className='d-flex justify-content-between'>
        <h2 className='fw-bold'>Cart Shop</h2>
        <Link to={'/checkout/' +cartData._id}>
        <button className='btn btn-primary btn-lg'>Check Out</button>
        </Link>
     
      </div>

      <div className='d-flex justify-content-between my-3'>
      <h5 className='fw-bold'>Total Price  : <span className='text-success fw-bold' >{(Totalcount==0)?0:cartData.totalCartPrice} </span>  EGP</h5>
     <h5 className='fw-bold'>total number of items: <span className='text-success fw-bold' >{cartCount} </span></h5>
      </div>

      <div className='border-bottom border-white border-5 my-4 py-3 mx-5 mx-auto'></div>
{/*  <Link className='text-decoration-none' to={'/product/' + el._id}> */}
   {cartData?.products?.map((el)=>{
    return <div key={el._id} className='row  align-items-center justify-content-between'>
    
     
       
       <div className="col-md-3">
       <Link className='text-decoration-none col-md-9 ' to={'/product/' + el.product.id}>
         <img src={el.product.imageCover} className='w-75 ' alt="" />
         </Link>
       </div>
      
       <div className="col-md-9 cursor-pointer">
         <div className='d-flex justify-content-between '>
           <h3 className='text-black'>{el.product.title}</h3>
           <div className='d-flex justify-content-end zzz'>
             <div className="btn btn-outline-success fw-bold" onClick={()=>upadateCount(el.product.id,el.count+1)}>+</div>
             <p className='fw-bold fs-5 mx-2'>{el.count}</p>
             <div className="btn btn-outline-success fw-bold" onClick={()=>upadateCount(el.product.id,el.count-1)}>-</div>
           </div>
         </div>

         <h5 className='fw-bold text-black'>Price  : <span className='text-success fw-bold' >{el.price} </span>  EGP</h5>   
         <span className='text-danger' onClick={()=>deletItem(el.product.id)}><i class="fa-solid fa-trash"></i> Remove</span>       
       </div>
       
       <div className='border-bottom border-secondary my-3 mx-5 mx-auto'></div>
     </div>
    
   })}
  
   {Totalcount!=0?<div className='d-flex justify-content-center pt-5'>
   <button className='btn btn-outline-success btn-lg' onClick={deleteAllProductsList}>Clear Your Cart</button></div>:""}
    </div>
    :""}
    {Totalcount==0?<div className='d-flex justify-content-center'>
      <h1 className='fw-bold'>your cart is empty</h1></div>:""}
    </>
  )
}
