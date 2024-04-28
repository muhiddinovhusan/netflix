// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAo09eSu-1-vVzNelChVybUpUnjccdwux4",
    authDomain: "netflix-clone-8df5a.firebaseapp.com",
    projectId: "netflix-clone-8df5a",
    storageBucket: "netflix-clone-8df5a.appspot.com",
    messagingSenderId: "917152927898",
    appId: "1:917152927898:web:91625109876cd256d28f23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
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
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split("/")[1].split('-').join())
    }
}
const login = async(email,password) => {
try {
    signInWithEmailAndPassword(auth, email, password);

} catch (error) {
    console.log(error.message)
    toast.error(error.code.split("/")[1].split('-').join())
}
}
const logout =() =>{
    signOut(auth);
}

export {auth, db , login , signup, logout};