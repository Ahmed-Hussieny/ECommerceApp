import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import BASEURL from '../../BaseUrl'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    let passerr= `Must meet the following criteria:
  - Start with a letter (either uppercase or lowercase).
  - Be between 6 and 9 characters in total.
  - Can only contain letters (A-Z or a-z) and numbers (0-9).`
    let nav=useNavigate();
    let [errors,setErrors]=useState("");
    let validationSchema = yup.object({
        email:yup.string().required("Email is Required").email().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"Enter Vaild Email"),
        newPassword:yup.string().required("password is Required").matches(/^[A-Z]@[a-z0-9]{5,8}$/,passerr),
    })
    let ResetForm = useFormik({
        initialValues:{
            email:"",
            newPassword:""
        },
        validationSchema,
        onSubmit:resetPassword
    })
   async function resetPassword(val){

        let {data}=await axios.put(`${BASEURL}auth/resetPassword`,val).catch((err)=>{
            // console.log(err);
            setErrors(err.response.data.message);
        })
        if(data.token){
            nav("/login");
        }
        // console.log(data);
    }
  return (
    <>
    <h2>Reset Password</h2>
    {(errors)?
        <div className='alert alert-danger'>
        <p >{errors}</p>
        </div>
        :""}
    <form onSubmit={ResetForm.handleSubmit}>
        <label htmlFor="email" className='my-3'>Email</label>
        <input onChange={ResetForm.handleChange} onKeyUp={ResetForm.handleBlur}  type="email" name="email" id="email" className='form-control mb-3' />
        {(ResetForm.touched.email&& ResetForm.errors.email)?
        <div className='alert alert-danger'>
        <p >{ResetForm.errors.email}</p>
        </div>
        :""}
        {/* newPassword */}

        <label htmlFor="newPassword" className='my-3'>password</label>
        <input onChange={ResetForm.handleChange} onKeyUp={ResetForm.handleBlur} type="password" name="newPassword" id="newPassword" className=' mb-3 form-control'/>
        {(ResetForm.touched.newPassword&& ResetForm.errors.newPassword)?
        <div className='alert alert-danger'>
        <p >{ResetForm.errors.newPassword}</p>
        </div>
        :""}

        <button type='submit' className='btn btn-outline-success mt-3'>Reset Password</button>
    </form>
    
    </>
  )
}
