import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import BASEURL from '../../BaseUrl';
import img3 from '../../assets/images/slider-image-3.jpeg'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCategory } from '../../Stores/CategorySlice';


export default function CategorySlider() {
  let {CategoryList}= useSelector((x)=>x.CategoryData)
  let disp = useDispatch();
    // let [catrgoryList,setCategoryList]=useState([])
    // async function getAllCategory(){
    //     let {data} = await axios.get(`${BASEURL}categories`);
        // console.log(data.data);
    //     setCategoryList(data.data);
    // }
    useEffect(()=>{
      disp(GetAllCategory())
    },[])
  return (
    <div>
    <OwlCarousel className='owl-theme' items={8}  loop  >
    {CategoryList.map((el)=>{
       return  <div className='item' key={el._id}>
         <img src={el.image} alt=""className='w-100 smImg' />
         <h5 className='text-center bg-light'>{el.name.split(" ").splice(0,1).join(" ")}</h5>
         </div>
    })}
</OwlCarousel>
    </div>
  )
}
