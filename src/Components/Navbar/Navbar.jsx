import React, { useContext } from 'react'
import logo from '../../assets/imgs/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'
// import { CounterContext } from '../../Context/counterContext';
// import $ from 'jquery'
import { CartContext } from '../../Context/CartContext';
export default function Navbar({userData}) {
  // let {count}=useContext(CounterContext);
  let{cartCount}=useContext(CartContext);
  // console.log(userData);

  document.querySelectorAll('.nav-link').forEach(function (element) {
    element.addEventListener('click', function () {
        document.querySelector('.navbar-collapse').classList.remove('show');
    });
});
  return (
    <>
    {/* {count} */}
<nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
  <div className="container pt-2">
    <Link className="navbar-brand" to=""><img src={logo} alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {!(userData==null)?
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link fw-bold" to="">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fw-bold" to="cart">Cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fw-bold" to="wish_list">Wish List</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fw-bold" to="products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fw-bold" to="categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fw-bold" to="brands">Brands</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fw-bold" to="allorders">Last Orders</NavLink>
        </li>
      </ul>:""}

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {!(userData==null)?
      <div className='d-flex'>
          <li className="nav-item">  
        <NavLink className="nav-link fw-bold position-relative pe-3"  to="cart">
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
    {cartCount}
  </span>
<i className="fa-solid fa-cart-shopping text-success"></i></NavLink>
      </li>
          <li className="nav-item">  
          <NavLink className="nav-link fw-bold" to="signout">signOut</NavLink>
        </li>
      </div>
        :
        <>
          <li className="nav-item">
        <NavLink className="nav-link fw-bold" to="login">Login</NavLink>
      </li>
       <li className="nav-item">
          <NavLink className="nav-link fw-bold" to="register">Register</NavLink>
        </li>
        </>
        }
      
        
       
       
      </ul>
     
    </div>
  </div>
</nav>

    </>
  )
}
