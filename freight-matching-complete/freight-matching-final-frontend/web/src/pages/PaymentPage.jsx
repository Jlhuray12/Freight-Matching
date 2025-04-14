import React from 'react';

export default function PaymentPage() {
  const checkoutStripe = async () => {
    const res = await fetch('http://localhost:5000/api/payment/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const { id } = await res.json();
    window.location = `https://checkout.stripe.com/pay/${id}`;
  };

  const checkoutPayPal = async () => {
    const res = await fetch('http://localhost:5000/api/payments/paypal/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const { id } = await res.json();
    window.open(`https://www.sandbox.paypal.com/checkoutnow?token=${id}`, '_blank');
  };

  const linkPlaid = async () => {
    const res = await fetch('http://localhost:5000/api/payments/plaid/link-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const { link_token } = await res.json();
    alert(`Plaid Link Token: ${link_token}`);
    // In production, use Plaid Link SDK
  };

  return (
    <div>
      <h2>Choose a Payment Method</h2>
      <button onClick={checkoutStripe}>Pay with Stripe</button>
      <button onClick={checkoutPayPal}>Pay with PayPal</button>
      <button onClick={linkPlaid}>Verify with Plaid</button>
    </div>
  );
}