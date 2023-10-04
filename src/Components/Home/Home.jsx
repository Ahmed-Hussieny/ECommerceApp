import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import BASEURL from '../../BaseUrl';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AddWishList } from '../../Stores/AddWishList';
export default function Home() {
    let [ProductsList,setProductList]=useState([]);
    let [ProductsListSearch,setProductsListSearch]=useState([]);
    let [LikeProducts,setLikeProducts]=useState([]);
let {AddToCart,setCartCount} = useContext(CartContext);

let {AddMessage}=useSelector((x)=>x.whshListAdd)
let dis =useDispatch()
async function makeSureThatIsLikedAndFetchAllProducts() {
  try {
    await makesureThatIsLiked();
    const products = await getAllProducts();
    // console.log(products);
  } catch (error) {
    console.error(error);
  }
}
    useEffect(()=>{
      makeSureThatIsLikedAndFetchAllProducts();

        // **** Way one to get page product
        // let pageItem= document.querySelectorAll(".pageItem")
        // console.log(pageItem);
        // pageItem.forEach((el)=>{
        //     el.addEventListener("click",function(e){
        //         console.log(e.target.innerHTML);
        //         getAllProducts(e.target.innerHTML);
        //     })
        // })
          // ************************************

        //   $(".pageItem").click(function(){
        //     getAllProducts($(this).html());
        //   })

            $(".pageItem").on("click",function(){
            getAllProducts($(this).html());
          })
          // $(".fa-heart").on('click',function(){
          //   $(this).addClass('text-danger')
          //  })
          //  dis(GetAllWishList());


    },[])
   async function getAllProducts(page = 1){
        $(".loading").fadeIn(1000);
        // makesureThatIsLiked()
        let {data}=await axios.get(`${BASEURL}products?page=${page}`);
        // console.log(data.data);
        setProductList(data.data);
        $(".loading").fadeOut(1000);
        setProductsListSearch(data.data)
    }

    async function addDataToCart(id){
     let {data} = await AddToCart(id)
     setCartCount(data.numOfCartItems);
    if(data.status=="success" ){
      toast.success(data.message,{className:"alert bg-success fw-bold text-white",position:"top-right"});

    }else{
      toast.error("error")
    }
    //  console.log(data)
    }
    async function makesureThatIsLiked() {
      let headers={
        token: localStorage.getItem("userToken")
    }
    let {data}=await axios.get(`${BASEURL}wishlist`,{headers})
    const kk = data.data.map((el) => el._id);
    // console.log(kk);
    setLikeProducts(kk);
    }


    async function addWishListt(id){
      $(".loading").fadeIn(1000);
    try {
      await  dis(AddWishList(id))
      makesureThatIsLiked()
      if(AddMessage.status=='success'){
        toast.success(AddMessage.message,{className:"alert bg-success fw-bold text-white",position:"top-right"});

      }
    }catch (error) {
      console.error(error);
    } 

    $(".loading").fadeOut(1000);
   }
  function handleSearchSearchChange(e){
    // console.log(e.target.value);
    filterProductsByTitle(e.target.value)
  }

  function filterProductsByTitle (val) {
    let filteredProducts = ProductsListSearch.filter(product =>
      product.title.toLowerCase().includes(val.toLowerCase())
    );
    setProductList(filteredProducts);
    // console.log(ProductsListSearch)
  };

  return (
    <>
  <Toaster/>
    <MainSlider/>
    <CategorySlider/>
    <div className='loading position-fixed top-0 bottom-0 end-0 start-0 '>
    <span className="loader"></span>
    </div>
     <div className='pt-5 w-50 mx-auto d-block'>
        <input type="text" name="search" id="search" onChange={handleSearchSearchChange} placeholder='Search....' className='form-control' />
        </div>
      <div className='row mt-4 g-3'>
       
       {ProductsList.map((el)=>{
        return  <div key={el._id} className='col-md-3'>
          <div className='product p-3 rounded-3 h-100 overflow-hidden '>
          <Link className='text-decoration-none' to={'/product/' + el._id}>
            <img src={el.imageCover} alt="" className='w-100'/>
            <p className='text-success'>{el.category.name}</p>
            <h5 className='fw-bold text-black'>{el.title.split(" ").splice(0,2).join(" ")}</h5>

            <div className='d-flex justify-content-between'>
                <p  className='text-black'>{el.price} EGP</p>
                <p className='text-black'><i className="fa-solid fa-star text-warning"></i>{el.ratingsAverage}</p>
            </div>
               </Link>
               <div className='d-flex justify-content-between '>
               {LikeProducts.includes(el._id)?
                <p ><i onClick={()=>addWishListt(el._id)} className="fa-solid fa-2x fa-heart text-danger  mx-2 cursor-pointer"></i></p>
                :
                <p ><i onClick={()=>addWishListt(el._id)} className="fa-solid fa-2x fa-heart  mx-2 cursor-pointer"></i></p>}
               
               
              
           </div>
               <div className='position-relative aa flex-fill btnAdd'>
               <button className='btn btn-success  w-100' onClick={()=>addDataToCart(el._id)}>+ Add</button>
               </div>
        </div>
          
            
            
    </div>
       })}
      </div>

      <div className="dflex ">
    <nav aria-label="Page navigation example" className='d-flex justify-content-center my-4' >
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">«</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link pageItem" >1</a></li>
    <li className="page-item"><a className="page-link pageItem" >2</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">»</span>
      </a>
    </li>
  </ul>
</nav>
    </div>
    </>
  )
}
