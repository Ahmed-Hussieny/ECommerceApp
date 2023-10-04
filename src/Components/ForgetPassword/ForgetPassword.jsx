import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from "yup"
import BASEURL from '../../BaseUrl'
import { useNavigate } from 'react-router-dom'
// import * as $ from 'jquery'
export default function ForgetPassword() {
    let nav=useNavigate();
    let [errors,serErrors]=useState("");
    let validationSchema = yup.object({
        email:yup.string().required("Email is Required").email().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"Enter Vaild Email"),
    })
    let ForgitForm=useFormik({
        initialValues:{
            email:""
        },
        validationSchema:validationSchema
        ,
        onSubmit:forgitSubmit
    })
   async function forgitSubmit(val){
        let {data}=await axios.post(`${BASEURL}auth/forgotPasswords`,val).catch((err)=>{
            // console.log(err);
        })
        // console.log(data);
        if(data.statusMsg == "success"){
            document.getElementById("PinCodeForm").classList.remove("d-none")
            document.getElementById("forgetForm").classList.add("d-none")
        }
    }
// ********************PINCode

    let validationSchema2 = yup.object({
        resetCode:yup.string().required("PinCode is Required").matches(/^[0-9]+$/)
    })
    let PinCodeForm=useFormik({
        initialValues:{
            resetCode:""
        },
        validationSchema:validationSchema2
        ,
        onSubmit:PinCodeSubmit
    })
    async function PinCodeSubmit(val){
        let {data}=await axios.post(`${BASEURL}auth/verifyResetCode`,val).catch((err)=>{
            // console.log(err);
            serErrors(err.response.data.message)
        })
        // console.log(data);
        if(data.status=="Success"){
            nav("/resetPassword")
        }

        
    }
  return (
    <>
     <div id='forgetForm'>
     <h2 className='my-4'>please enter your Email</h2>
      <form onSubmit={ForgitForm.handleSubmit}>
        <input onChange={ForgitForm.handleChange} onKeyUp={ForgitForm.handleBlur} type="email" name="email" id="email" placeholder='Email' className='form-control mb-3 form-control-lg'/>
        {(ForgitForm.touched.email && ForgitForm.errors.email)?
        <div className='alert alert-danger'>
        <p >{ForgitForm.errors.email}</p>
        </div>:""}
        <button disabled={!(ForgitForm.dirty && ForgitForm.isValid)} type='submit' className='btn btn-outline-success mt-4 btn-lg'>Verify</button>
      </form>
     </div>



     <div id='PinCodeForm' className='d-none'>
     <h2 className='my-4'>please enter your verification code</h2>
     {(errors)?
        <div className='alert alert-danger'>
        <p >{errors}</p>
        </div>:""}
      <form onSubmit={PinCodeForm.handleSubmit}>
        <input onChange={PinCodeForm.handleChange} onKeyUp={PinCodeForm.handleBlur} type="text"  name="resetCode" id="resetCode" placeholder='pinCode' className='form-control form-control-lg'/>
        {(PinCodeForm.touched.resetCode && PinCodeForm.errors.resetCode)?
        <div className='alert alert-danger'>
        <p >{PinCodeForm.errors.resetCode}</p>
        </div>:""}
        <button disabled={!(PinCodeForm.dirty && PinCodeForm.isValid)}  type='submit' className='btn btn-outline-success mt-4 btn-lg'>Send</button>
      </form>
     </div>
    </>
  )
}
