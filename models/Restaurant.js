import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  deliveryTime: {
    type: String,
    required: true
  },
  costForTwo: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  offers: [{
    type: String
  }],
  promoted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;