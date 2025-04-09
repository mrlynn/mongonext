/**
 * @file Product model
 * @module models/product.model
 */

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // Add more fields as needed
}, {
  timestamps: true,
});

// Prevent mongoose from creating the model if it already exists
export default mongoose.models.Product || mongoose.model('Product', productSchema); 