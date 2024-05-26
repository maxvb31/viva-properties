import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

export default function PaymentPage() {
  const handleClick = async (e) => {
    const stripe = await loadStripe('pk_test_51PKQUQP2WcwkR8ROJgqNwKFc7ClAFBsFWiBB8xXG6rVmrDCFVPo4v3c1a1GujXYCaQ43syldKB2WBhqQI2yCilsD00rjnzHVZR');
    
    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1PKj3tP2WcwkR8RObH94KJnj',
          quantity: 1
        }],
        mode: 'payment',
        successUrl: 'http://localhost:3000', // Corrected URL
        cancelUrl: 'http://localhost:3000/cancel',   // Corrected URL
      });

      if (error) {
        console.error('Error during redirect to Checkout:', error);
        // Handle error, show message to user, etc.
      }
    } catch (error) {
      console.error('Error during redirect to Checkout:', error);
      // Handle error, show message to user, etc.
    }
  };

  return (
    <button onClick={handleClick}>Get Course Access</button>
  );
}
