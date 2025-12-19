import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  itemTotal: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 40
  },
  platformFee: {
    type: Number,
    default: 2
  },
  total: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    type: String,
    default: 'Not provided'
  },
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery'
  },
  status: {
    type: String,
    enum: ['Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Placed'
  },
  estimatedDelivery: Date
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;