import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// We'll try to import the config. If it doesn't exist yet (provisioning in progress),
// we use an empty object to avoid crash during initial development.
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// @ts-ignore
export const db = getFirestore(app, firebaseConfig?.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
export default app;
