import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutComponent from './CheckoutComponent'

const stripePromise = loadStripe('pk_test_51MVAMRSJcuN58KBt6xknTuoGvP2g9OSOC8UPCz4P86HMHFk4nlX9Wt4kyeevMU0zE0LTbdJE9AU37lO9jpBzcsYW00sjPcNuuO')

const PaymentPage = () => {
    return (
        <>
            <div>
                <h1 className='shipping-head'>Payment Page</h1>
            </div>
            <div className="card" style={{ display: "flex", backgroundColor:"#00FFCC", justifyContent: "center", alignItems: "center", height: "89vh", boxShadow: "none" }}>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutComponent />
                    </Elements>
                </div>
            </div>
        </>
    )
}

export default PaymentPage