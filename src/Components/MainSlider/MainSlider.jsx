import React from 'react'
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function MainSlider() {
  return (
    <div className='row g-0 mt-4'>
      <div className="col-md-9">
    <OwlCarousel className='owl-theme' items={1} loop  >
    <div className='item'>
    <img src={img1} alt=""className='w-100 mainImg' />
    </div>
    <div className='item'>
    <img src={img2} alt=""className='w-100 mainImg' />
    </div>
    <div className='item'>
    <img src={img3} alt=""className='w-100 mainImg' />
    </div>
</OwlCarousel>
      </div>
      <div className="col-md-3">
      <img src={img2} alt="" className='w-100 smImg'/>
      <img src={img3} alt="" className='w-100 smImg'/>
        
      </div>
    </div>
  )
}
