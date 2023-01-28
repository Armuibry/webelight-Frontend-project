import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../store/cartSlice'
import { searchActions } from '../store/filterslice'

import './Model.css'

function Model() {
    const modelData = useSelector(state => state.modelState.modelItem)
    const cartItem = useSelector(state => state.cartState.cartItems)

    const dispatch = useDispatch();
    const [color, setColor] = useState();
    const [size, setSize] = useState("");

    const option = {
        border: "1px solid green"
    }

    useEffect(()=>{
        window.localStorage.setItem('userCart',JSON.stringify(cartItem))
    },[cartItem])

    const handleCart = async () => {
        if (size !== "") {
            let product = {
                ...modelData,
                size: size,
                quantity: 1
            }
            dispatch(cartActions.addToCart(product))
            dispatch(searchActions.toggleModel(false))
        }
    }

    const changeColor = (e) => {
        setColor(option)
        setSize(e.target.innerText)
    }
    return (
        <div className='product-modal'>
            <div className="crossbtn">
                <span onClick={() => dispatch(searchActions.toggleModel(false))}>X</span>
            </div>
            {
                modelData ? (<div className="cross">
                    <div className="img">
                        {
                            modelData.otherImages.map((image, index) => <img key={index} src={image} alt="ProductImage" />)
                        }
                    </div>
                    <div className="details">
                        <h3>{modelData.name}</h3>
                        <i>{modelData.description}</i>
                        <p>RS. {modelData.price}</p>
                        <strike>{modelData.strickPrice}</strike>
                        <p>{modelData.discount}% OFF</p>
                        <div className="size">
                            {
                                modelData.productSize.split(",").map((size, index) => <button key={index} style={color} onClick={changeColor}>{size}</button>)
                            }
                        </div>
                        {
                            size ? <p style={{ color: "white", marginTop: "10px" }}>Selected Size: {size} </p>
                                :
                                <p style={{ marginTop: "10px", color: 'red', }}>Please Select Size: {size} </p>
                        }

                        <button onClick={handleCart}>Add to cart</button>

                    </div>

                </div >) : ""
            }

        </div>

    )
}

export default Model