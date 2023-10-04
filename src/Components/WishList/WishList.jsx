import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllWishList } from '../../Stores/WishList'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'
import $ from 'jquery'
import { deleteSpacificProductFromWishList } from '../../Stores/DeletWishList'

export default function WishList() {
  let {AddToCart}=useContext(CartContext)
  let {WishListAllData}=useSelector((x)=>x.whshListData)
  let {deleteMessage}=useSelector((x)=>x.whshListDelete)
  let disp = useDispatch();

  async function ADDtocart(id){
    $(".loading").fadeIn(1000);
    let {data} = await AddToCart(id);
    // console.log(data)
    if(data.status==='success'){
      toast.success(data.message,{className:"alert bg-success fw-bold text-white",position:"top-right"});
    }
    dell(id)
    $(".loading").fadeOut(1000);
  }
  useEffect(()=>{
    $(".loading").fadeIn(1000);
    disp(GetAllWishList())
    $(".loading").fadeOut(1000);
  },[])


  async function dell(id) {
    try {
      $(".loading").fadeIn(1000);
      await disp(deleteSpacificProductFromWishList(id));
      const wishList = await disp(GetAllWishList());
      $(".loading").fadeOut(1000);
    } catch (error) {
      console.error(error);
    }
  }

  async function del(id) {
    $(".loading").fadeIn(1000);
    try {
      
      await disp(deleteSpacificProductFromWishList(id))
      if(deleteMessage.status){
        toast.success(deleteMessage.message, {
          className: "alert bg-success fw-bold text-white",
          position: "top-right"
        })}
      const wishList = await disp(GetAllWishList());
    
    } catch (error) {
      console.error(error);
    }
    $(".loading").fadeOut(1000);
  }
  
  
  // console.log(WishListAllData)

  return (
   <>
       <div className='loading position-fixed top-0 bottom-0 end-0 start-0 '>
    <span className="loader"></span>
    </div>
    <Toaster/>
    <div className='py-5'>
      <h1 className='fw-bold'>My wish List</h1>
     {WishListAllData?.map((el)=>{
      return  <div key={el._id} className='row align-items-center justify-content-between bg-light'>

      <div className="col-md-3 ">
      {/* <Link className='text-decoration-none col-md-9' to={'/product/' + el.product.id}> */}
        <img src={el.imageCover} className='w-75  ' alt="" />
        {/* </Link> */}
      </div>
     
      <div className="col-md-9 ps-5">
        <div className='d-flex justify-content-between position-relativ'>
          <h3 className='text-black'>{el.title}</h3>
          <div className='d-flex justify-content-end zzz'>
            <button className='btn btn-outline-success' onClick={()=>ADDtocart(el._id)}>Add To Cart</button>
           
          </div>
        </div>
  
        <h5 className='fw-bold text-black'>Price  : <span className='text-success fw-bold' >{el.price}</span>  EGP</h5>   
        <span className='text-danger cursor-pointer'onClick={()=>del(el._id)} ><i className="fa-solid fa-trash "></i> Remove</span>       
      </div>
      
      <div className='border-bottom border-secondary my-3 mx-5 mx-auto'></div>
    </div>
     })}
    </div>
    </>
  )
}
