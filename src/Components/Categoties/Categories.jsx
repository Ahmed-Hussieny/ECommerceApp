import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllCategory } from '../../Stores/CategorySlice';
import img from '../../assets/1680403266739-cover.jpeg'
import $ from 'jquery'
export default function Categories() {
  let {CategoryList}=useSelector((x)=>x.CategoryData)
  let disp = useDispatch();

  useEffect(()=>{
    $(".loading").fadeIn(1000);
    disp(GetAllCategory())
    $(".loading").fadeOut(1000);
  },[])
  // console.log(CategoryList);
  return (
   <>
    <div className='loading position-fixed top-0 bottom-0 end-0 start-0 '>
    <span className="loader"></span>
    </div>
    <div className='py-5'>
      <div className="row gy-3">
        {CategoryList.map((el)=>{
          return <div key={el._id} className="col-md-4 rounded-3 ">
          <div className="itemCat cursor-pointer  border border-1 border-secondary rounded-3 ">
            <div className='position-relative mainImg  overflow-hidden'>
               <img src={el.image} className='w-100 top-0 position-absolute rounded-3' alt="" />
            </div>
        <div className=' py-4 text-center bg-white rounded-3 '>
             <h3 className='text-success fw-bold'>{el.name}</h3>
           </div>
          </div>
        
         </div>
        })}
      </div>
      
    </div>
    </>
  )
}
