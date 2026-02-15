
import { NextResponse } from 'next/server';
import { authenticateRequest, checkRateLimit, createResponse, createError } from '../../../lib/api-utils';
import { generateRoadmapAI } from '../../../lib/gemini-service';
import { getAdminDb } from '../../../lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const decodedToken = await authenticateRequest(req);
    await checkRateLimit(decodedToken.uid, 'roadmap', 3, 24 * 60 * 60 * 1000); // 3 per day

    const { targetRole, currentSkills = [], hoursPerWeek = 20, weeks = 8, budget = 100000 } = await req.json();

    if (!targetRole) {
      return createError('VAL_002', 'Target role is required');
    }

    const db = getAdminDb();
    
    // Check Cache
    const cacheKey = `roadmap_${targetRole.replace(/\s+/g, '_').toLowerCase()}_${weeks}`;
    const cacheSnap = await db.ref(`aiCache/${cacheKey}`).once('value');
    
    if (cacheSnap.exists()) {
      const cacheData = cacheSnap.val();
      if (Date.now() < cacheData.expiresAt) {
        return createResponse(cacheData.response, 'Retrieved from cache');
      }
    }

    // Generate with AI - Fix: Using generateRoadmapAI from lib/gemini-service.ts
    const result = await generateRoadmapAI(targetRole, currentSkills, hoursPerWeek, weeks, budget);

    // Save to Cache (Expires in 7 days)
    await db.ref(`aiCache/${cacheKey}`).set({
      response: result,
      createdAt: Date.now(),
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
    });

    return createResponse(result);

  } catch (error: any) {
    const code = error.message.includes('RATE_') ? 'RATE_001' : 'AI_001';
    return createError(code, error.message);
  }
}
