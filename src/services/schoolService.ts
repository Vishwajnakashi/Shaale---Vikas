import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  updateDoc, 
  increment, 
  addDoc, 
  serverTimestamp,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Need, Pledge } from '../types';

export const schoolService = {
  // Subscribe to all needs
  subscribeToNeeds: (callback: (needs: Need[]) => void) => {
    const q = query(collection(db, 'needs'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const needs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Need[];
      callback(needs);
    }, (error) => {
      console.error("Firestore Error (Needs):", error);
    });
  },

  // Pledge support for a need
  pledgeSupport: async (needId: string, amount: number, donorName: string, donorId: string = 'alumni-1') => {
    try {
      // 1. Create the pledge record
      const pledgeData = {
        needId,
        donorId,
        donorName,
        amount,
        pledgeType: 'Funds',
        timestamp: new Date().toISOString(),
      };
      await addDoc(collection(db, 'pledges'), pledgeData);

      // 2. Increment the collected amount in the need document
      const needRef = doc(db, 'needs', needId);
      await updateDoc(needRef, {
        collectedAmount: increment(amount),
        updatedAt: serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      console.error("Pledge Error:", error);
      throw error;
    }
  },

  // Admin: Create a new need
  createNeed: async (need: Omit<Need, 'id' | 'createdAt' | 'collectedAmount' | 'status'>) => {
    try {
      const newNeed = {
        ...need,
        collectedAmount: 0,
        status: 'Open',
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, 'needs'), newNeed);
      return docRef.id;
    } catch (error) {
      console.error("Create Need Error:", error);
      throw error;
    }
  }
};
