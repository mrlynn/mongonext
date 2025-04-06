// src/app/api/auth/reset-password/route.js
import { NextResponse } from 'next/server';
import { resetPassword } from '@/lib/services/user.service';

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();
    
    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Token and new password are required' },
        { status: 400 }
      );
    }
    
    const result = await resetPassword(token, newPassword);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}