import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as YUP from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
export default function Login({saveUserData}) {
  let [errMessage,setErrMessage]=useState("");
  let [loading,setLoading]=useState(false);
  let validationSchema  = YUP.object({
    email:YUP.string().required("Email is Required").email().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"Enter Vaild Email"),
    password:YUP.string().required("password is Required"),
  })
  let nav=useNavigate();
  let baseUrl = "https://ecommerce.routemisr.com";
  let LoginForm = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema,
    onSubmit:loginSubmit
  })
 async function loginSubmit(val){
  setLoading(true);
  let {data}=await axios.post(`${baseUrl}/api/v1/auth/signin`,val).catch((err)=>{
    // console.log(err.response.data.message)
    setErrMessage(err.response.data.message)
    setLoading(false);
  })
  if(data.message==="success"){
    setErrMessage("")
    localStorage.setItem("userToken",data.token);
    setLoading(false);
    saveUserData(data.user)
    let user_id = data.user.id
    let token=localStorage.getItem("userToken");
    let dataa = jwtDecode(token);

    // console.log(dataa.id)
    localStorage.setItem('userId',dataa.id);
    nav("/home");
    
    
  }
    // console.log(val);
    // console.log(data);
  }
  return (
    <>
    

    <h2 className='mt-5 fw-bold'>Login Form</h2>
    {(errMessage)?
        <div className='alert alert-danger'>
        <p >{errMessage}</p>
        </div>
        :""}
    
    <form onSubmit={LoginForm.handleSubmit}>
      <div className='my-5'>
        <label htmlFor="email">Email :</label>
        <input onChange={LoginForm.handleChange} onKeyUp={LoginForm.handleBlur} type="email" name="email" id="email" className='form-control my-2' />
        {(LoginForm.touched.email&& LoginForm.errors.email)?
        <div className='alert alert-danger'>
        <p >{LoginForm.errors.email}</p>
        </div>
        :""}
      </div>

      <div className='my-3'>
        <label htmlFor="password">Password :</label>
        <input onChange={LoginForm.handleChange} onKeyUp={LoginForm.handleBlur} type="password" name="password" id="password" className='form-control my-2' />
        {(LoginForm.touched.password&& LoginForm.errors.password)?
        <div className='alert alert-danger'>
        <p >{LoginForm.errors.password}</p>
        </div>
        :""}
      </div>

      
     <div className='d-flex  pt-5'>
      <Link className='text-decoration-none' to="/forgetpassword"><h4 className='forgetButton y-3'>Forget Password ? </h4></Link>
      {loading?
  <button type='button'   className='btn btn-success d-block  ms-auto px-5 py-3 '><i className='fa-solid fa-spinner fa-spin'></i></button>
  : <button disabled={!(LoginForm.isValid && LoginForm.dirty)} type='submit' className='btn btn-success d-block  ms-auto px-5 py-3 '>Login</button>
}
     </div>
      
    </form>
    </>
  )
}
