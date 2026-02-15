
import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from './firebase-admin';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function createResponse(data: any, message: string = 'Success', status: number = 200) {
  return NextResponse.json({
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  }, { status, headers: corsHeaders });
}

export function createError(code: string, message: string, suggestion?: string, status: number = 400) {
  return NextResponse.json({
    success: false,
    error: {
      code,
      message,
      suggestion
    },
    timestamp: new Date().toISOString()
  }, { status, headers: corsHeaders });
}

export async function authenticateRequest(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('AUTH_001: No token provided');
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const auth = getAdminAuth();
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('AUTH_002: Invalid or expired token');
  }
}

export async function checkRateLimit(userId: string, endpoint: string, limit: number, windowMs: number) {
  const db = getAdminDb();
  const limitRef = db.ref(`rateLimits/${userId}/${endpoint}`);
  const snapshot = await limitRef.once('value');
  const data = snapshot.val();
  
  const now = Date.now();
  
  if (!data || now > data.resetAt) {
    await limitRef.set({
      count: 1,
      resetAt: now + windowMs
    });
    return true;
  }
  
  if (data.count >= limit) {
    const resetIn = Math.ceil((data.resetAt - now) / 1000 / 60);
    throw new Error(`RATE_002: Daily limit exceeded for ${endpoint}. Reset in ${resetIn} minutes.`);
  }
  
  await limitRef.update({
    count: data.count + 1
  });
  
  return true;
}
