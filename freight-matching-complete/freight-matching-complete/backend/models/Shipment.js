const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  shipper: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  broker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  carrier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'in_transit', 'delivered'], default: 'pending' },
  proofOfDelivery: {
    fileUrl: String,
    uploadedAt: Date
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipment', shipmentSchema);