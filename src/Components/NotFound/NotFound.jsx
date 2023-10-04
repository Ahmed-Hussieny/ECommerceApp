import React from 'react'
import img from '../../assets/imgs/error.svg'
export default function NotFound() {
  return (
    <div className='pt-5 d-flex justify-content-center'>
      <img src={img} className='w-75' alt="" />
    </div>
  )
}
