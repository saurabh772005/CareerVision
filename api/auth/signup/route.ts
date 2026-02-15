
import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '../../../lib/firebase-admin';
import { createResponse, createError } from '../../../lib/api-utils';

export async function POST(req: Request) {
  try {
    const { email, password, name, userType = 'student' } = await req.json();

    if (!email || !password || !name) {
      return createError('VAL_002', 'Missing required fields: email, password, or name');
    }

    const auth = getAdminAuth();
    const db = getAdminDb();

    // 1. Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // 2. Initialize profile in Realtime Database
    await db.ref(`users/${userRecord.uid}/profile`).set({
      email,
      name,
      userType,
      createdAt: Date.now(),
      lastLogin: Date.now()
    });

    return createResponse({
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName
      }
    }, 'Account created successfully', 201);

  } catch (error: any) {
    return createError('AUTH_005', error.message || 'Signup failed');
  }
}
