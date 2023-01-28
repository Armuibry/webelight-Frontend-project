import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from "../store/productSlice"
import '../styles/App.css';
import Filter from './Filter';
import SignIn from '../login/SignIn';
import SignUp from '../login/SignUp';

import { Routes, Route } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import FormDetails from './FormDetails';
import { cartActions } from '../store/cartSlice';
import PaymentPage from './PaymentPage';

const App = () => {

  const dispatch = useDispatch();
  const productState = useSelector(state => state.productActions)
  
  useEffect(() => {
    dispatch(getProduct());
    dispatch(cartActions.updateFromLocal(JSON.parse(window.localStorage.getItem('userCart')) || []))
  }, [dispatch])
  console.log(productState.product);

  return (
    <>
      <div id="main">

        <Routes>
          <Route path="/" element={<Filter />} />
          <Route path='/shopping-cart' element={<ShoppingCart />} />
          <Route path='/confirm-order' element={<FormDetails />} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/payment' element={<PaymentPage/>} />




        </Routes>
      </div>
    </>
  )
}


export default App;
