import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBrands } from '../../Stores/BrandsSlice'
import $ from 'jquery'
export default function Brands() {
  let {BrandsList}=useSelector((x)=>x.BrandsData)
  let disp = useDispatch();

  useEffect(()=>{
    $(".loading").fadeIn(1000);
    disp(getAllBrands());
    $(".loading").fadeOut(1000);
  },[])

  // console.log(BrandsList)
  return (
 <>
    <div className='loading position-fixed top-0 bottom-0 end-0 start-0 '>
    <span className="loader"></span>
    </div>
    <div className='py-5'>
      <h1 className='text-success text-center fw-bold pb-5'>All Brands</h1>
      <div className="row gy-3">
        {BrandsList.map((el)=>{
          return  <div key={el._id} className="col-md-3 rounded-3 ">
          <div className="itemCat cursor-pointer  border border-1 border-secondary rounded-3 ">
            <div className='position-relative smImg  overflow-hidden'>
               <img src={el.image} className='w-100 top-0 position-absolute rounded-3' alt="" />
            </div>
        <div className=' py-4 text-center bg-white rounded-3 '>
             <h3 className='fw-bold'>{el.name}</h3>
           </div>
          </div>
        
         </div>
        })}
      </div>
      
    </div>
    </>
  )
}
