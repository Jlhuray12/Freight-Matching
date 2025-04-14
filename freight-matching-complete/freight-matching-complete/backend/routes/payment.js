const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Shipment = require('../models/Shipment');

router.post('/create-checkout-session', async (req, res) => {
  const { shipmentId } = req.body;
  const shipment = await Shipment.findById(shipmentId);

  if (!shipment || shipment.status !== 'delivered' || !shipment.proofOfDelivery?.fileUrl) {
    return res.status(400).json({ message: 'Shipment must be delivered and POD uploaded before payment.' });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Freight Shipment' },
        unit_amount: 9900,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://yourapp.com/success',
    cancel_url: 'https://yourapp.com/cancel',
  });

  res.json({ id: session.id });
});

module.exports = router;