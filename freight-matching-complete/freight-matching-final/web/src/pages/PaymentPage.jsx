import React from 'react';

export default function PaymentPage() {
  const checkout = async () => {
    const res = await fetch('http://localhost:5000/api/payment/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const { id } = await res.json();
    window.location = `https://checkout.stripe.com/pay/${id}`;
  };

  return (
    <div>
      <h2>Payment</h2>
      <button onClick={checkout}>Pay with Stripe</button>
    </div>
  );
}