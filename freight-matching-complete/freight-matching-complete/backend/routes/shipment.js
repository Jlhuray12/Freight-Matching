const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');

router.post('/mark-delivered/:id', async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  if (!shipment) return res.status(404).json({ message: 'Shipment not found' });

  shipment.status = 'delivered';
  shipment.proofOfDelivery = {
    fileUrl: req.body.fileUrl,
    uploadedAt: new Date()
  };

  await shipment.save();
  res.json({ message: 'Shipment marked as delivered', shipment });
});

router.get('/:id', async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  if (!shipment) return res.status(404).json({ message: 'Not found' });
  res.json(shipment);
});

module.exports = router;