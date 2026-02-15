
// NOTE: In a real Next.js environment, these would use service account credentials from env
// For this hackathon demo, we provide the structure and initialization logic.

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

export const initFirebaseAdmin = () => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
  }
};

// Lazy getter for the admin services
export const getAdminDb = () => {
  initFirebaseAdmin();
  return getDatabase();
};

export const getAdminAuth = () => {
  initFirebaseAdmin();
  return getAuth();
};
