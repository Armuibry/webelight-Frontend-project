import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const id = paymentMethod.id
                console.log(id);
                const response = await fetch("https://ecommerce-backend-webe.onrender.com/api/user/payment", {
                    method: 'POST',
                    body: JSON.stringify({
                        id,
                        amount:1000
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data.message);
                if(data.success === "true"){
                    alert("Payment Successfull redirecting to home page");
                    window.localStorage.removeItem('userCart');
                    dispatch(cartActions.deleteCart([]))
                    navigate('/')
                }else{
                    alert("Payment Failed please try with correct details");
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: "center", backgroundColor: " #ffffff", width: "26rem", padding: "1rem", borderRadius: "10px" }}>
            <h1 style={{ padding: "0 1rem" }}>Enter Card Details</h1><br />
            <CardElement options={CARD_OPTIONS} />
            <button type="submit" disabled={!stripe || !elements} style={{cursor:"pointer", margin: "1rem", padding: "1rem", width: "10rem", backgroundColor: "rgb(245, 185, 75)", border: "1px solid grey", borderRadius: "1rem" }}>
                Pay Now
            </button>
        </form>
    );
};

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#05CEC5",
            color: "#000000",
            fontWeight: "500",
            fontSize: "20px",

        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default CheckoutComponent

