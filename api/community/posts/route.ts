
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../lib/firebase-admin';
import { createResponse, createError } from '../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    const db = getAdminDb();
    let query = db.ref('forumPosts').limitToLast(limit);
    
    const snapshot = await query.once('value');
    const posts = snapshot.val() || {};

    const list = Object.entries(posts).map(([id, val]: [string, any]) => ({
      id,
      ...val
    })).reverse();

    return createResponse({
      posts: category ? list.filter(p => p.category === category) : list,
      totalCount: list.length
    });

  } catch (error: any) {
    return createError('DB_001', error.message);
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, category, tags = [] } = await req.json();
    
    const db = getAdminDb();
    const newPostRef = db.ref('forumPosts').push();
    
    const postData = {
      title,
      content,
      category,
      tags,
      engagement: { upvotes: 0, downvotes: 0, answerCount: 0 },
      metadata: {
        createdAt: Date.now(),
        status: 'open'
      }
    };

    await newPostRef.set(postData);

    return createResponse({ postId: newPostRef.key }, 'Post created');
  } catch (error: any) {
    return createError('DB_002', error.message);
  }
}
