/**
 * @file Products API route
 * @module app/api/products/route
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/product.model';

/**
 * GET handler for products collection
 * Returns all products or filtered by query parameters
 * 
 * @param {Request} request - The incoming request
 * @returns {NextResponse} JSON response with products data
 */
export async function GET(request) {
  try {
    await connectDB();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    
    // Build query
    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};
    
    // Get total count for pagination
    const total = await Product.countDocuments(query);
    
    // Get products with pagination
    const products = await Product
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for products collection
 * Creates a new product
 * 
 * @param {Request} request - The incoming request
 * @returns {NextResponse} JSON response with created product data
 */
export async function POST(request) {
  try {
    await connectDB();
    
    // Parse request body
    const body = await request.json();
    
    // Create new product
    const product = await Product.create(body);
    
    return NextResponse.json({
      success: true,
      data: product
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 