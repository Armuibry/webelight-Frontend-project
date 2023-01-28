import React,{useRef} from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const navigate = useNavigate();

  const firstName = useRef()
  const lastName = useRef()
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const contact = useRef();
  const cPassword = useRef();
  let data;
    const handleSubmit = async(e) =>{
      e.preventDefault();
      if(password.current.value === cPassword.current.value){
      const user = {
          firstName : firstName.current.value,
          lastName : lastName.current.value,
          email: email.current.value,
          username: username.current.value,
          contact: contact.current.value,
          password: password.current.value
        }
        const response = await fetch('https://ecommerce-backend-webe.onrender.com/api/user/signup',{
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        data = await response.json();
        console.log(data);
        document.cookie = `token= ${data.token}`;
        // console.log(user);
      }else {
        alert("Confirm Password should match...!");
      }

      if(!data.error){
        navigate('/');
      }else {
        alert("Username or Contact already Registered");
      }

      
      
    }
  return (
    <div className='signUp-container'>
      <div className='signUp-child'>
        <h1 className='signUp-title'>CREATE AN ACCOUNT</h1>
        <form className='signUp-form' onSubmit={handleSubmit}>
            <input placeholder='First name' required ref={firstName}/>
            <input  placeholder='Last name' required ref={lastName}/>
            <input  placeholder='username' type="text" required ref={username}/>
            <input  placeholder='Email' type="email" required ref={email}/>
            <input  placeholder='Contact No' required ref={contact}/>
            <input  placeholder='Password' type="password" required ref={password}/>
            <input  placeholder='Confirm Password' type="password" required ref={cPassword}/>
            <span  className='signUp-agree' type='checkbox' required>
                By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
            </span>
            <button className='signUp-btn'>CREATE</button>

        </form>
      </div>
    </div>
  )
}

export default SignUp
