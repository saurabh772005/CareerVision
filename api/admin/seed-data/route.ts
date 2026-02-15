
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../lib/firebase-admin';
import { generateSeedData } from '../../../lib/gemini-service';

export async function POST(req: Request) {
  try {
    const { dataType, count = 10 } = await req.json();
    
    if (!dataType) {
      return NextResponse.json({ success: false, error: 'DataType is required' }, { status: 400 });
    }

    const adminDb = getAdminDb();
    
    // In hackathon mode, we use AI to generate high-quality placeholder data
    const items = await generateSeedData(dataType, count);
    
    const ref = adminDb.ref(dataType);
    const updates: Record<string, any> = {};
    
    for (const item of items) {
      const newKey = ref.push().key;
      if (newKey) {
        updates[newKey] = {
          ...item,
          metadata: {
            createdAt: Date.now(),
            verified: true,
            seeded: true
          }
        };
      }
    }
    
    await ref.update(updates);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${Object.keys(updates).length} items to ${dataType}`,
      data: { count: Object.keys(updates).length }
    });

  } catch (error: any) {
    console.error('Seed API Error:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'DB_002', message: error.message }
    }, { status: 500 });
  }
}
