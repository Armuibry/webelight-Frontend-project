import React,{useRef} from 'react';
import { useDispatch } from 'react-redux';
import { userAction } from '../store/userSlice';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();

  const handleSignin = async(e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value
    }
    const response = await fetch('https://ecommerce-backend-webe.onrender.com/api/user/signin',{
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if(!data.error){
      document.cookie = `token = ${data.token}`;
      window.localStorage.setItem("user",JSON.stringify(data.user))
      dispatch(userAction.updateUser({
        user: data.user,
      }))
      navigate('/');
    }
    else{
      console.log(data.error);
    }
  } 


  return (
    <div className='signIn-container'>
      <div className='signIn-child'>
        <h1 className='signIn-title'>SIGN IN</h1>
        <h6>{}</h6>
        <form className='signIn-form' onSubmit={handleSignin}>
          <input placeholder="username or email" type="email" required ref={email}/>
          <input placeholder="password" type="password" required ref={password}/>
          <button className='signIn-btn'>LOGIN</button>
          <div className='signIn-link'>DO NOT YOU REMEMBER THE PASSWORD?</div>
          <Link to="/signup">
            <div className='signIn-link'>CREATE A NEW ACCOUNT</div>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignIn
