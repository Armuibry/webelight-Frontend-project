import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchActions } from '../store/filterslice';
import { modelActions } from '../store/modalSlice';


import Model from './Model';

import './Card.css'

function Card({ image, name, description, price, oldPrice, discount,prod }) {

   const dispatch = useDispatch();

   const flag = useSelector(state => state.searchActions.flag);

   
   const handleModel = (e)=>{
      dispatch(searchActions.toggleModel(true));
      dispatch(modelActions.addToModel(prod));
   }

    return (
       <>
       {
          flag?(<Model prod={prod}/>):("")
        }
       <div className="card" >
       <div className='indiv-tile-holder'>
       <img src={image} alt="ProductImage" 
       onClick={handleModel}
       />
       <h3>{name}</h3>
       <i>{description}</i>
       <div className="price">
       <p>Rs. {price}</p>
       <strike>{oldPrice}</strike>
       <p>{discount}% OFF</p>
       </div>
       </div>
       </div>
       </>
    )
}

export default Card