import React from 'react';
import { View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function PaymentScreen() {
  const handlePayment = async () => {
    const res = await fetch('http://localhost:5000/api/payment/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const { id } = await res.json();
    WebBrowser.openBrowserAsync(`https://checkout.stripe.com/pay/${id}`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pay with Stripe" onPress={handlePayment} />
    </View>
  );
}