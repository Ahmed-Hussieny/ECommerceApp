import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BASEURL from '../../BaseUrl';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery'
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AddWishList } from '../../Stores/AddWishList';

export default function Product() {
  // ***********3lashn astlm elly parametr elly gai mn el nevigation
  let {id} = useParams();
  // console.log(id)
  // *******************************
  let [LikeProducts,setLikeProducts]=useState([]);

  let [product,setproduct]=useState(null);
  let {AddToCart,cartCount,setCartCount} = useContext(CartContext);

  let {AddMessage}=useSelector((x)=>x.whshListAdd)
  let dis =useDispatch()
  async function getProductDetails(){
    let {data}= await axios.get(`${BASEURL}products/${id}`);
    // console.log(data.data);
    setproduct(data.data)
  }
  useEffect(()=>{
    $(".loading").fadeIn(1000);
    makeSureThatIsLikedAndFetchAllProducts();
     $(".loading").fadeOut(1000);
  },[])
  async function makesureThatIsLiked() {
    let headers={
      token: localStorage.getItem("userToken")
  }
  let {data}=await axios.get(`${BASEURL}wishlist`,{headers})
  const kk = data.data.map((el) =>  el._id);
  // console.log(kk);
  setLikeProducts(kk);
  }
  async function makeSureThatIsLikedAndFetchAllProducts() {
    $(".loading").fadeIn(1000);
    try {
      await makesureThatIsLiked();
      const products = await getProductDetails()();
      // console.log(products);
    } catch (error) {
      console.error(error);
    }
    $(".loading").fadeOut(1000);
  }
  async function addDataToCart(id){
    let {data} = await AddToCart(id)
    makeSureThatIsLikedAndFetchAllProducts()
    let d = cartCount;
    setCartCount(d+1);
   if(data.status=="success"){
     toast.success(data.message,{className:"alert bg-success fw-bold text-white",position:"top-right"});

   }else{
     toast.error("error")
   }
  //  console.log("oooooo")
   //  console.log(data)
   }
  async function addWishListt(id){

   try {
     await  dis(AddWishList(id))
    //  if(AddMessage.status=='success'){
       toast.success(AddMessage.message,{className:"alert bg-success fw-bold text-white",position:"top-right"});
    //  }
   }catch (error) {
     console.error(error);
   }
   makeSureThatIsLikedAndFetchAllProducts()
  }

  return (
    <>
    <Toaster/>
    <div className='loading position-fixed top-0 bottom-0 end-0 start-0 '>
    <span className="loader"></span>
    </div>
    {product!=null?
    <div className='row mt-5'>
    <div className="col-md-3">

      <OwlCarousel className='owl-theme' items={1} loop  >
        {product.images.map((el)=>{
          return  <div key={el._id} className='item'>
          <img src={el} className='w-100' alt="" />
          </div>
        })}
</OwlCarousel>


    </div>
    <div className="col-md-9 d-flex flex-column justify-content-center">
      <h2>{product.title}</h2>
      <p className='text-muted'>{product.description}</p>

      <p className='text-main'>{product.category.name}</p>
      <div className='d-flex justify-content-between'>
                <p  className='text-black'>{product.price} EGP</p>
                <p className='text-black'><i className="fa-solid fa-star text-warning"></i>{product.ratingsAverage}</p>
            </div>

         <div className='d-flex justify-content-between align-items-baseline mt-3'>
         <button className='btn btn-success w-75'  onClick={()=>addDataToCart(id)}>Add To Cart</button>
         {LikeProducts.includes(id)?
          <p onClick={()=>addWishListt(id)} ><i className="fa-solid fa-2x text-danger  fa-heart mx-2 cursor-pointer" ></i></p>
          :
          <p onClick={()=>addWishListt(id)} ><i className="fa-solid fa-2x   fa-heart mx-2 cursor-pointer" ></i></p>
          }
            
         </div>
    </div>
  </div>
  :""}
    </>
  )
}