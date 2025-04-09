/**
 * @file Product API route for individual items
 * @module app/api/products/[id]/route
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product.model';

/**
 * GET handler for a single product
 * Returns a product by ID
 * 
 * @param {Request} request - The incoming request
 * @param {Object} params - Route parameters
 * @param {string} params.id - product ID
 * @returns {NextResponse} JSON response with product data
 */
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Find product by ID
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

/**
 * PATCH handler for a single product
 * Updates a product by ID
 * 
 * @param {Request} request - The incoming request
 * @param {Object} params - Route parameters
 * @param {string} params.id - product ID
 * @returns {NextResponse} JSON response with updated product data
 */
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();
    
    // Find and update product
    const product = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for a single product
 * Deletes a product by ID
 * 
 * @param {Request} request - The incoming request
 * @param {Object} params - Route parameters
 * @param {string} params.id - product ID
 * @returns {NextResponse} JSON response with success message
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Find and delete product
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 