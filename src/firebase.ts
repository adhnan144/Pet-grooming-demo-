import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLCZaccEF7_NoFXRXd-R2zCENIZve1HiQ",
  authDomain: "tactical-anthem-c5jvd.firebaseapp.com",
  projectId: "tactical-anthem-c5jvd",
  storageBucket: "tactical-anthem-c5jvd.firebasestorage.app",
  messagingSenderId: "457637860414",
  appId: "1:457637860414:web:75fadd5c31c3efb8dc6d6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
// Since our databaseId is custom (ai-studio-4750930c-438a-44f3-8237-1fe87525e4ea), we pass it as the second parameter
export const db = getFirestore(app, "ai-studio-4750930c-438a-44f3-8237-1fe87525e4ea");

// Connection Validation as per guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    // We ignore expected permission errors on the "test/connection" doc,
    // but log if it states we are completely offline
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration. Client is offline.");
    }
  }
}

testConnection();
