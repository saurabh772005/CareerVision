
import { NextResponse } from 'next/server';
import { authenticateRequest, checkRateLimit, createResponse, createError } from '../../../lib/api-utils';
import { validateCourseAI } from '../../../lib/gemini-service';
import { getAdminDb } from '../../../lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const decodedToken = await authenticateRequest(req);
    await checkRateLimit(decodedToken.uid, 'validator', 20, 24 * 60 * 60 * 1000);

    const { courseId, userProfile } = await req.json();

    if (!courseId) return createError('VAL_002', 'Course ID is required');

    const db = getAdminDb();
    
    // Fetch course details
    const courseSnap = await db.ref(`courses/${courseId}`).once('value');
    if (!courseSnap.exists()) return createError('DB_003', 'Course not found');
    const course = courseSnap.val();

    // Call AI - Fix: Using validateCourseAI from lib/gemini-service.ts
    const analysis = await validateCourseAI(course, userProfile || {});

    return createResponse(analysis);

  } catch (error: any) {
    return createError('AI_002', error.message);
  }
}
