import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'



import './FormDetails.css'

function FormDetails() {
    const navigate = useNavigate();
    const nameref = useRef()
    const emailref = useRef()
    const mobref = useRef()
    const addref = useRef()
    const stateref = useRef()
    const cityref = useRef()
    const pinref = useRef()


    const handleForm = (e) => {
        e.preventDefault();
        if (nameref !== "" && emailref !== "" && mobref !== "" && addref !== "" && stateref !== "" && cityref !== "" && pinref !== "") {
            navigate("/")


        }

    }

    return (
        <div className='form'>
            <form onSubmit={handleForm}>
                <h1>Shipping Details</h1>
                <div className="name">
                    <input required type="text" placeholder='Enter Your Name' ref={nameref} />
                    <input required type="email" placeholder='Enter Your Email' ref={emailref} />
                </div>
                <div className="address">
                    <input required type="text" placeholder='Enter Mobile No' ref={mobref} />
                    <input required type="text" placeholder='Enter Full Address' ref={addref} />
                </div>
                <div className="area">
                    <input required type="text" placeholder='Enter State' ref={stateref} />
                    <input required type="text" placeholder='Enter District' ref={cityref} />
                    <input required type="text" placeholder='EnterPincode' ref={pinref} />
                </div>

                <button className='btn'>Confirm Address</button>

            </form>

        </div>
    )
}

export default FormDetails