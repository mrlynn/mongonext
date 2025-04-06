/**
 * @file MongoDB connection utility
 * @module lib/db/connect
 */

import mongoose from 'mongoose';

/**
 * Cache the database connection
 * @type {Promise<typeof mongoose>|null}
 */
let cached = global.mongoose;

/**
 * Initialize the cached mongoose connection
 */
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB
 * Ensures a single connection is reused across the application
 * 
 * @async
 * @function connectDB
 * @returns {Promise<typeof mongoose>} Mongoose connection instance
 * @throws {Error} If connection fails
 */
async function connectDB() {
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    // MongoDB driver 4.0+ doesn't need these options anymore
    const options = {};

    cached.promise = mongoose.connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  // Wait for connection and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;