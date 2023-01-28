import React, { useEffect } from 'react'
import { searchActions } from "../store/filterslice"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userAction } from '../store/userSlice'
import { cartActions } from '../store/cartSlice'
import './NavBar.css'
import { IoMdContact } from 'react-icons/io'

function Navbar() {
  const dispatch = useDispatch()
  const cartItem = useSelector(state => state.cartState.cartItems)
  const userdata = useSelector(state => state.userState.user)

  const productStatus = useSelector(state => state.productActions);
  // const user = useSelector(state => state.userState.user);
  const data = productStatus.product
  const { updateSearch } = searchActions;


  const navigate = useNavigate();

  const handleCart = () => {
    if (user) {
      if (cartItem.length > 0) {
        navigate("shopping-cart")
      } else {
        alert("Please add item in the cart to view cart");
      }
    }else{
      alert("Please Login")
    }
  }
  let user = JSON.parse(window.localStorage.getItem('user'))
  useEffect(() => {
  }, [userdata, user, cartItem])


  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    let searchData;
    if (value === "men") {
      searchData = data.filter(item => item.gender.includes("M"))
    } else if (value === "women") {
      searchData = data.filter(item => item.gender.includes("F"))

    } else {
      searchData = data.filter(item => item.name.toLowerCase().includes(value) || item.description.toLowerCase().includes(value))
    }
    dispatch(updateSearch(searchData));
  }

  const handleUser = async () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('userCart')
    dispatch(cartActions.deleteCart([]))
    dispatch(userAction.updateUser(false))
  }

  return (
    <nav>
      <div className="icon-holder">
        <img src="amir.jfif" alt="NavLogo" />
      </div>
      <div className="cate">
        <h4 onClick={() => dispatch(updateSearch(data.filter(item => item.gender.includes("M"))))}>Men</h4>
        <h4 onClick={() => dispatch(updateSearch(data.filter(item => item.gender.includes("F"))))}>Women</h4>
        <h4 onClick={() => dispatch(updateSearch(data.filter(item => item.name.toLowerCase().includes("ki") || item.description.toLowerCase().includes("ki"))))}>Kids</h4>
      </div>
      <input type="text" onChange={handleSearch} placeholder='Search for products, brands and more' />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user !== null && <h3 style={{ marginRight: "0.5rem" }}>{user.firstName}</h3>}
        {
          user ? (<h4 className='logout' onClick={handleUser}>logout</h4>) : (<IoMdContact size={31} onClick={() => navigate('/signin')} />)
        }

      </div>
      <div className="cart-holder" onClick={handleCart}>
        <img src="shopping-cart-solid.svg" alt="cart" />
        <div className="cart-list-length">{cartItem.length}</div>
      </div>
    </nav>
  )
}

export default Navbar