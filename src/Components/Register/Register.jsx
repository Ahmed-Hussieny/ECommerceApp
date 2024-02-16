import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as YUP from 'yup'
import { useNavigate } from 'react-router-dom';

export default function Register() {

  let baseUrl = "https://ecommerce.routemisr.com";

  let [errMessage,setErrMessage]=useState("");
  let [loading,setLoading]=useState(false);

  let nav = useNavigate();


  // native One 
  // ******************
  // let [userData,setUerData]=useState({
  //   name:"",
  //   email:"",
  //   password:"",
  //   rePassword:"",
  //   phone:""
  // })
  // function changeName(e){
  //   let userData2 = {...userData}
  //   userData2.name=e.target.value
  //   setUerData(userData2)
  //   console.log(userData)
  // }
  // w ha3ml kda lkol wahed f leh estakhdm Formik 
  // ******************

  // ************validation using YUP
  let passerr= `Must meet the following criteria:
  - Start with a letter and (@) (either uppercase or lowercase).
  - Be between 6 and 9 characters in total.
  - Can only contain letters (A-Z or a-z) and numbers (0-9).`
  let validationSchema = YUP.object({
    name:YUP.string().required("Name Is Required").min(4,"Must Contain 4 characters").max(10,"Must Contain less than 10 characters"),
    email:YUP.string().required("Email is Required").email().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"Enter Vaild Email"),
    password:YUP.string().required("password is Required").matches(/^[A-Z]@[a-z0-9]{5,8}$/,passerr),
    rePassword:YUP.string().required("repassword is Required").oneOf([YUP.ref("password")],"re-Password pattern is inavalid"),
    phone:YUP.string().required("Phone is Required").matches(/^01[0125][0-9]{8}$/)
  })
  // *****************

  let RegisterForm= useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    // ****************************Native Validation
    // validate:(x)=>{

    //   let errors={}
    //   if(x.name==""){
    //     errors.name="req"
    //   }
    //   if(x.email==""){
    //     errors.email="req"
    //   }
    //   return errors
    // },
    // ****************************
    validationSchema,
    onSubmit:registerSubmit
  })
//  async function submitForm(val){
//     let {data} =await axios.post(`${baseUrl}/api/v1/auth/signup`,val)
//     // let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,val)
//     console.log(data);
//   }

async function registerSubmit(val){
  setLoading(true);
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signup`,val).catch((err)=>{
      // console.log(err.response.data.message)
      //  console.log(err)
      setErrMessage(err.response.data.message);
      setLoading(false)
    })
    // // if(data.message == "success"){
    // //   navigate("/login")
    // //   setLoding(false);
    // // }
    if(data.message=="success"){
      nav("/login");
      setLoading(false)
    }
   
    // console.log(data)
  }
  return (
    <>
    <h2 className='mt-5 fw-bold'>Register Form</h2>
    <form className='my-3' onSubmit={RegisterForm.handleSubmit}>
      {errMessage?
      <div className='alert alert-danger'>
        <p >{errMessage}</p>
      </div>:""}
      <div>
      <label htmlFor="name">Name : </label>
       <input onChange={RegisterForm.handleChange} onKeyUp={RegisterForm.handleBlur} className='form-control my-3'  type="text" name="name" id="name"/>
       {(RegisterForm.touched.name&& RegisterForm.errors.name)?
        <div className='alert alert-danger'>
        <p >{RegisterForm.errors.name}</p>
        </div>
        :""}
        {/* {registerForm.touched.name ? <p className='text-danger'>{registerForm.errors.name}</p>:""} */}
      {/* *****native Validation */}
      </div>

       <div>
       <label htmlFor="email">Email :</label>
       <input className='form-control my-3' onKeyUp={RegisterForm.handleBlur} onChange={RegisterForm.handleChange}  type="email" name="email" id="email" />
       {(RegisterForm.touched.email&& RegisterForm.errors.email)?
        <div className='alert alert-danger'>
        <p >{RegisterForm.errors.email}</p>
        </div>
        :""}
       </div>

       <div>
       <label htmlFor="password">Password</label>
       <input className='form-control my-3'  onKeyUp={RegisterForm.handleBlur} onChange={RegisterForm.handleChange}  type="password" name="password" id="password" />
       {(RegisterForm.touched.password&& RegisterForm.errors.password)?
        <div className='alert alert-danger'>
        <p >{RegisterForm.errors.password}</p>
        </div>
        :""}
       </div>
       

      <div>
      <label htmlFor="rePassword">rePassword</label>
       <input className='form-control my-3'  onKeyUp={RegisterForm.handleBlur} onChange={RegisterForm.handleChange}  type="password" name="rePassword" id="rePassword" />
       {(RegisterForm.touched.rePassword&& RegisterForm.errors.rePassword)?
        <div className='alert alert-danger'>
        <p >{RegisterForm.errors.rePassword}</p>
        </div>
        :""}
      </div>

      <div>
      <label htmlFor="phone">Phone :</label>
       <input className='form-control my-3'  onKeyUp={RegisterForm.handleBlur} onChange={RegisterForm.handleChange}  type="tel" name="phone" id="phone" />
       {(RegisterForm.touched.phone && RegisterForm.errors.phone)?
        <div className='alert alert-danger'>
        <p >{RegisterForm.errors.phone}</p>
        </div>
        :""}
      </div>

{loading?
  <button type='button'   className='btn btn-success d-block  ms-auto px-5 py-3 '><i className='fa-solid fa-spinner fa-spin'></i></button>
  : <button disabled={!(RegisterForm.isValid && RegisterForm.dirty)} type='submit' className='btn btn-success d-block  ms-auto px-5 py-3 '>Register</button>
}
     </form>
     
    </>
  )
}
