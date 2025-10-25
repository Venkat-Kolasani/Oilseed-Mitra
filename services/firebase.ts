import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth, type User, type ConfirmationResult } from 'firebase/auth';
import { 
    getFirestore, 
    writeBatch, 
    doc as firebaseDoc, 
    setDoc, 
    getDoc, 
    runTransaction, 
    onSnapshot as firebaseOnSnapshot,
    type Firestore, 
    type DocumentReference 
} from 'firebase/firestore';
import { type Gamification, type Profile } from '../types';

// --- [PASTE YOUR FIREBASE CONFIG HERE] ---
const firebaseConfig = JSON.parse((window as any).__firebase_config || '{}');
const appId = typeof (window as any).__app_id !== 'undefined' ? (window as any).__app_id : 'default-app-id';

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let doc: typeof firebaseDoc;
let onSnapshot: typeof firebaseOnSnapshot;


export const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";

// --- Mock Implementations ---
const mockProfileData: Profile = {
    name: 'Test Farmer (Mock)',
    phone: '+919999999999',
    location: 'Ruralville (Mock)',
};

let mockGamificationData: Gamification = {
    points: 1250,
    badges: ['Early Adopter', 'Top Simulator'],
};

const mockEmitter = {
  listeners: {} as Record<string, Function[]>,
  on(event: string, callback: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    return () => this.off(event, callback); // Return unsubscribe function
  },
  emit(event: string, data: any) {
    (this.listeners[event] || []).forEach(callback => callback(data));
  },
  off(event: string, callback: Function) {
    this.listeners[event] = (this.listeners[event] || []).filter(l => l !== callback);
  }
};


const createMockAuth = (): Auth => {
    // ... (rest of the mock auth implementation remains the same)
    let currentUser: User | null = null;
    let listener: ((user: User | null) => void) | null = null;

    const mockUser: User = {
        uid: 'TEST_UID',
        email: null,
        emailVerified: false,
        isAnonymous: false,
        metadata: { creationTime: new Date().toUTCString(), lastSignInTime: new Date().toUTCString() },
        providerData: [],
        providerId: 'phone',
        tenantId: null,
        displayName: 'Test Farmer',
        phoneNumber: '+919999999999',
        photoURL: null,
        delete: () => Promise.resolve(),
        getIdToken: () => Promise.resolve('mock-token'),
        getIdTokenResult: () => Promise.resolve({ token: 'mock-token' } as any),
        reload: () => Promise.resolve(),
        toJSON: () => ({}),
    };

    return {
        onAuthStateChanged: (newListener: (user: User | null) => void) => {
            listener = newListener;
            setTimeout(() => {
                if (listener) listener(currentUser);
            }, 0);
            return () => { listener = null; };
        },
        signInWithPhoneNumber: (phoneNumber: string) => {
            console.log(`Mock signInWithPhoneNumber for ${phoneNumber}`);
            return Promise.resolve({
                confirm: (otp: string) => {
                    if (otp && otp.length === 6) {
                        currentUser = mockUser;
                        if (listener) listener(currentUser);
                        return Promise.resolve({ user: currentUser });
                    }
                    return Promise.reject(new Error("Invalid mock OTP."));
                }
            } as ConfirmationResult);
        },
        signOut: () => {
            currentUser = null;
            if (listener) listener(null);
            return Promise.resolve();
        },
    } as unknown as Auth;
};

if (isFirebaseConfigured) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    doc = firebaseDoc;
    onSnapshot = firebaseOnSnapshot;
} else {
    console.warn("Firebase config not found. Using mock implementation. Please provide a valid Firebase configuration.");
    auth = createMockAuth();
    
    const mockDoc = (...args: any[]): DocumentReference => {
        const path = args[1]; // doc(db, path) -> we only need the path
        return { path } as DocumentReference;
    };

    const mockOnSnapshot = (docRef: DocumentReference, callback: (snapshot: any) => void): (() => void) => {
        const eventName = docRef.path.includes('gamification') ? 'gamificationUpdate' : 'profileUpdate';
        const handler = (data: any) => {
            callback({
                exists: () => true,
                data: () => data,
            });
        };
        const unsubscribe = mockEmitter.on(eventName, handler);
        
        // Initial data emission
        if (eventName === 'gamificationUpdate') {
            handler(mockGamificationData);
        } else if (eventName === 'profileUpdate') {
            handler(mockProfileData);
        }
        
        return unsubscribe;
    };

    db = {} as Firestore;
    doc = mockDoc as any;
    onSnapshot = mockOnSnapshot as any;
}

export const updateGamificationPoints = async (userId: string, pointsToAdd: number) => {
    console.log(`Adding ${pointsToAdd} points for user ${userId}`);
    if (isFirebaseConfigured) {
        try {
            const gamificationRef = doc(db, `artifacts/${appId}/users/${userId}/gamification`);
            await runTransaction(db, async (transaction) => {
                const gamificationDoc = await transaction.get(gamificationRef);
                if (!gamificationDoc.exists()) {
                    // Initialize if doesn't exist
                    transaction.set(gamificationRef, { points: pointsToAdd, badges: [] });
                } else {
                    const currentPoints = gamificationDoc.data().points || 0;
                    const newPoints = currentPoints + pointsToAdd;
                    transaction.update(gamificationRef, { points: newPoints });
                }
            });
            console.log("Points updated successfully in Firestore.");
        } catch (e) {
            console.error("Transaction failed: ", e);
        }
    } else {
        // Mock implementation
        mockGamificationData.points += pointsToAdd;
        mockEmitter.emit('gamificationUpdate', mockGamificationData);
        console.log("Mock points updated to:", mockGamificationData.points);
    }
};

const seedDatabase = async () => {
    if (!db || !isFirebaseConfigured) {
        console.error("Firestore is not initialized or in mock mode. Cannot seed database.");
        alert("Firestore is not initialized or in mock mode. Cannot seed database.");
        return;
    }

    try {
        const batch = writeBatch(db);
        await setDoc(doc(db, `artifacts/${appId}/users/TEST_UID/profile`), { name: 'Test Farmer', phone: '+919999999999', location: 'Ruralville' });
        await setDoc(doc(db, `artifacts/${appId}/users/TEST_UID/gamification`), { points: 1250, badges: ['Early Adopter', 'Top Simulator'] });
        await batch.commit();
        console.log('Database seeded successfully with user data!');
        alert('Database seeded successfully with user data!');
    } catch (error) {
        console.error('Error seeding database:', error);
        alert('Error seeding database. Check console for details.');
    }
};

(window as any).seedDatabase = seedDatabase;

export { auth, db, appId, doc, onSnapshot };