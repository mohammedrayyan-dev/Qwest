import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut } from "firebase/auth";
import {
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA3SNOJxWbIYNlym0HA6-ayaK5fN3qg6r8",
  authDomain: "qwest-2fef9.firebaseapp.com",
  projectId: "qwest-2fef9",
  storageBucket: "qwest-2fef9.firebasestorage.app",
  messagingSenderId: "36424265227",
  appId: "1:36424265227:web:47b6e23b2cf09bf71f610e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        return toast.success("Account created successfully!", {
          autoClose: 2000,
          pauseOnHover: false
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "), {
            autoClose: 3000,
            pauseOnHover: false,
        });
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return toast.success("Logged in successfully!", {
            autoClose: 2000,
            pauseOnHover: false
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "),{
            autoClose: 3000,
            pauseOnHover: false,
        });
    }
}

const logout = () => {
    signOut(auth);
    return toast.success("Logged out successfully!", {
      autoClose: 2000,
      pauseOnHover: false
    })
} 

export {auth, db, login, signup, logout};