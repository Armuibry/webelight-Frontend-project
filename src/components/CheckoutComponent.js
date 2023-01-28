import React from 'react';
import ReactDOM from 'react-dom';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutComponent = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{textAlign:"center",backgroundColor:" #ffffff",width:"26rem", padding:"1rem",borderRadius:"10px"}}>
        <h1 style={{padding:"0 1rem"}}>Enter Card Details</h1><br />
      <CardElement options={CARD_OPTIONS}/>
      <button type="submit" disabled={!stripe || !elements} style={{margin:"1rem",padding:"1rem", width:"10rem",backgroundColor:"rgb(245, 185, 75)",border:"1px solid grey",borderRadius:"1rem"}}>
        Pay Now
      </button>
    </form>
  );
};

const CARD_OPTIONS = {
    iconStyle:"solid",
    style:{
        base:{
            iconColor:"#05CEC5",
            color:"#000000",
            fontWeight:"500",
            fontSize:"20px",

        },
        invalid:{
            iconColor:"#ffc7ee",
            color:"#ffc7ee"
        }
    }
}

export default CheckoutComponent

