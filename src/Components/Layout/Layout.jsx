import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout({userData}) {
  return (
  <>
  <Navbar userData={userData}/>
  <div className='container pt-5 '>
  <Outlet/>
  </div>
  </>
  )
}
