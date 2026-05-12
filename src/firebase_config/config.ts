import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableNetwork, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Ensure network is enabled
enableNetwork(db).catch((error) => {
  console.warn('Failed to enable network:', error);
});

// Test connection with correct Firestore syntax
async function testConnection() {
  try {
    // Use correct Firebase v9+ syntax
    const testDocRef = doc(db, '_test', 'connection');
    const testDoc = await getDoc(testDocRef);
    console.log('✓ Firebase connection successful');
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('offline')) {
        console.error('⚠ Firebase is offline. Check your internet connection.');
      } else {
        console.warn('Firebase connection test:', error.message);
      }
    }
  }
}

// Delay test to ensure app is fully initialized
setTimeout(testConnection, 1000);
