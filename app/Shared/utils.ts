import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Timestamp, addDoc, collection, getDocs, where, query, updateDoc, doc } from "firebase/firestore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast, { Toaster } from 'react-hot-toast';
import firebase from "../firebase/firebase";
import { ScoreDocument } from "./interfaces";

const auth = getAuth();

export const addNewScore = async (nickname: string, score: number): Promise<void> => {
  try {
    const db = firebase.firestore();
    const scoresCollection = collection(db, "scores");

    // Check if the nickname already exists
    const querySnapshot = await getDocs(query(scoresCollection, where("nickname", "==", nickname)));

    if (querySnapshot.size > 0) {
      // If the nickname exists, do nothing and show a message
      errorMessage("Nickname already exists. Score not updated.");
    } else {
      // If the nickname doesn't exist, add a new document
      const newScoreDoc: ScoreDocument = {
        nickname,
        score,
        gameplayDate: Timestamp.fromDate(new Date()), // Use Timestamp here      
      };

      await addDoc(scoresCollection, newScoreDoc);
      successMessage("Score added successfully! 🎉");
    }
    location.reload()
  } catch (error) {
    console.error(error);
    errorMessage("Failed to add/update score ❌");
  }
};



export const successMessage = (message: string) => {
  toast.success(message);
};
export const errorMessage = (message: string) => {
  toast.error(message);
};

export const LoginUser = (email: string, password: string, router: AppRouterInstance) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      successMessage("Authentication successful 🎉");
      router.push("/dashboard");
    })
    .catch((error) => {
      console.error(error);
      errorMessage("Incorrect Email/Password ❌");
    });
};

export const LogOut = (router: AppRouterInstance) => {
  signOut(auth)
    .then(() => {
      successMessage("Logout successful! 🎉");
      router.push("/");
    })
    .catch((error) => {
      errorMessage("Couldn't sign out ❌");
    });
};