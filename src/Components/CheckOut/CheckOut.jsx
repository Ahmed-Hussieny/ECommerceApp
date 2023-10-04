import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as yup from 'yup'
import $ from 'jquery'
import { CartContext } from '../../Context/CartContext'
import { useNavigate, useParams } from 'react-router-dom'
export default function CheckOut() {
    let { id } = useParams();
    let { checkPayment, checkPaymentCash } = useContext(CartContext);
let Nav=useNavigate()
    let validationSchema = yup.object({
        details: yup.string().required("details is required").min(3, "details min length is 3"),
        phone: yup.string().required("phone is required").matches(/^01[1205][0-9]{8}$/, "Enter a Valid Phone Number"),
        city: yup.string().required("city is required").min(3, "details min length is 3"),
    })
    let [method, setMethod] = useState('');
    let formPay = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        }, validationSchema,
        onSubmit: Pay
    })

  async  function Pay(val) {
          let optionValue =  $(".form-select").val();

          if(optionValue==1) {
            let { data } = await checkPayment(id, val)
            // console.log(data)
            if (data.status == 'success') {
                window.location.href = data.session.url
            }
            
        }else{
            // console.log("Cash")
                
                let { data } = await checkPaymentCash(id, val)
                // console.log(data)
                if (data.status == 'success') {
                    Nav('/allorders')
                

            }
        }
      
    }
    function payVisa(val){
        async function formpaysubmit(val) {
            let { data } = await checkPayment(id, val)
            // console.log(data)
            if (data.status == 'success') {
                window.location.href = data.session.url
            }

        }
    }

 

    return (
        <>

            <div className='mx-5 m-auto'>
                <form onSubmit={formPay.handleSubmit}>
                    <label htmlFor="details" className='mt-4'>Details</label>
                    <input onChange={formPay.handleChange} onBlur={formPay.handleBlur} type="text" name="details" id="details" className='form-control my-3' />
                    {(formPay.touched.details && formPay.errors.details) ?
                        <div className='alert alert-danger'>
                            <p >{formPay.errors.details}</p>
                        </div>
                        : ""}
                    <label htmlFor="phone">Phone</label>
                    <input onChange={formPay.handleChange} onBlur={formPay.handleBlur} type="tel" name="phone" id="phone" className='form-control my-3' />
                    {(formPay.touched.phone && formPay.errors.phone) ?
                        <div className='alert alert-danger'>
                            <p >{formPay.errors.phone}</p>
                        </div>
                        : ""}

                    <label htmlFor="city">City</label>
                    <input onChange={formPay.handleChange} onBlur={formPay.handleBlur} type="text" name="city" id="city" className='form-control my-3' />

                    {(formPay.touched.city && formPay.errors.city) ?
                        <div className='alert alert-danger'>
                            <p >{formPay.errors.city}</p>
                        </div>
                        : ""}

<select className="form-select" >
  <option  className='option' value="1">Using Visa</option>
  <option  className='option'  value="2">Cash On Delivery</option>
</select>
                    <button type='submit' disabled={!(formPay.dirty, formPay.isValid)} className='w-100 btn btn-outline-success mt-5'> Pay Now<i className="fa-brands fa-cc-visa"></i></button>

                </form>
            </div></>
    )
}
