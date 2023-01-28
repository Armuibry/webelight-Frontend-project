import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector,useDispatch } from 'react-redux';
import {ImCancelCircle} from 'react-icons/im'
import { cartActions } from '../store/cartSlice';

import './ShoppingCart.css'
import { Link } from 'react-router-dom';


function ShoppingCart() {
     const dispatch = useDispatch();
    const filterData = useSelector(state => state.cartState.cartItems);
    let Price = 0;
    // Price = filterData.map(item => Price = Number(item.price)) + Number(item.price);
    for (let item of filterData){
      Price += Number(item.quantity) * Number(item.price);
    }

    console.log(filterData);

const user = window.localStorage.getItem('user');
    return (
        <>
            {
                user?(
                    <div className='shopping-cart'>
            <h1>Checkout Page</h1>
            <div className="cart-wrap">
                <h3>Shopping Cart</h3>
                <div className="cart-items">
                    
                    <Scrollbars style={{ width: "100%", height: 350 }}>

                        {
                            filterData.map((product) =>

                                <div key={product._id} className="single-item">
                                    <div className="image">
                                        <img src={product.otherImages[0]} alt=" productImage" />
                                    </div>
                                    <div className="name">
                                        <h5>{product.name}</h5>
                                        <h6>{product.description}</h6>
                                    </div>
                                    
                                    <div className="sizecart">
                                        <h5>Size: {product.size}</h5>
                                    </div>
                                    <div>
                                        <h5 className='sizecart'>Qty: {product.quantity}</h5>
        
                                    </div>
                                    
                                    <div className="price">
                                        <p>Rs/Item: {product.price}</p>
                                    </div>
                                    <div className="price">
                                        <p>Total Rs: {`${Number(product.quantity) * Number(product.price)}`}</p>
                                    </div>
                                    <div style={{color:'black'}} onClick={()=>dispatch(cartActions.removeFromCart(product._id))}>
                                          <ImCancelCircle size={23}/>
                                    </div>
                                </div>)
                        }


                    </Scrollbars>
                </div>
                <div className="checkout">
                    <h3>Total Items: 0{filterData.length}</h3>
                    <h3>Total Amount: Rs. {Price}</h3>
                    <Link to="/confirm-order">
                        <button>Checkout</button>
                    </Link>
                </div>

            </div>
        </div>
                ):(<div><h1>You Are not authorised to view this page please Login</h1></div>)
            }
        </>
        
    )
}

export default ShoppingCart