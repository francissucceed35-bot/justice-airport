const mongoose = require('mongoose');

const shippingRequestSchema = new mongoose.Schema({
    senderFirstName: { type: String, required: true },
    senderLastName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    senderPhone: { type: String, required: true },
    senderCountry: { type: String, required: true },
    senderState: { type: String, required: true },
    senderCity: { type: String, required: true },
    senderAddress: { type: String, required: true },
    receiverFirstName: { type: String, required: true },
    receiverLastName: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    receiverPhone: { type: String, required: true },
    receiverCountry: { type: String, required: true },
    receiverState: { type: String, required: true },
    receiverCity: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    itemDescription: { type: String, required: true },
    weightKg: { type: Number, required: true },
    deliveryOption: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const ShippingRequest = mongoose.model('ShippingRequest', shippingRequestSchema);

module.exports = ShippingRequest;
