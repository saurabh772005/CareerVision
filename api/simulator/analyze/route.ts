
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../lib/firebase-admin';
import { simulateCareerPath } from '../../../lib/gemini-service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile } = body;

    if (!profile) {
      return NextResponse.json({ 
        success: false, 
        error: { code: 'VAL_002', message: 'Profile is required' } 
      }, { status: 400 });
    }

    const adminDb = getAdminDb();

    // 1. Check Cache
    // Create a simple hash from profile
    const profileString = JSON.stringify(profile);
    let hash = 0;
    for (let i = 0; i < profileString.length; i++) {
      hash = ((hash << 5) - hash) + profileString.charCodeAt(i);
      hash |= 0;
    }
    const cacheKey = Math.abs(hash).toString(16);

    const cacheSnap = await adminDb.ref(`aiCache/${cacheKey}`).once('value');
    if (cacheSnap.exists()) {
      const cacheData = cacheSnap.val();
      if (Date.now() < cacheData.expiresAt) {
        return NextResponse.json({ success: true, data: cacheData.response, cached: true });
      }
    }

    // 2. Get all paths from DB to compare
    const pathsSnap = await adminDb.ref('careerPaths').once('value');
    const allPathsVal = pathsSnap.val() || {};
    const allPaths = Object.entries(allPathsVal).map(([id, val]: [string, any]) => ({ pathId: id, ...val }));

    // 3. Call AI - Fix: Using simulateCareerPath from lib/gemini-service.ts
    const analysis = await simulateCareerPath(profile, allPaths);

    // 4. Save to Cache
    await adminDb.ref(`aiCache/${cacheKey}`).set({
      query: profileString,
      response: analysis,
      createdAt: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    });

    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Simulator API Error:', error);
    return NextResponse.json({
      success: false,
      error: { 
        code: 'SRV_001', 
        message: error.message || 'Internal server error' 
      }
    }, { status: 500 });
  }
}
