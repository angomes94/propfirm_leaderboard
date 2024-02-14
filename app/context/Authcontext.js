"use client"
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { addDoc, doc, getDocs,getDoc, setDoc, arrayUnion, arrayRemove, updateDoc, deleteDoc, collection, query, where } from 'firebase/firestore'
import { auth, db } from "../utils/firebase";
import { USERS_COLLECTION } from '../utils/constants'

const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState("none")

    useEffect(() => {
      
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser)
        })
    
      return () => {
        unsubscribe()
      }
    }, [user])
    

    


    async function signup(email, password, username) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        await updateProfile(currentUser, { displayName: username });
        await setDoc(doc(db, USERS_COLLECTION , currentUser.uid), {
            email: email,
            name: username,
            uid: currentUser.uid,
            selectedProjectID: ""
        });
    }




    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }


    function logout() {
        return signOut(auth)
    }

    async function checkIfUserExists(useremail) {
        const querySnapshot = await getDocs(query(
          collection(db, USERS_COLLECTION),
          where("email", "==", useremail)
        ));
        
        return !querySnapshot.empty;
      }


    return ( <AuthContext.Provider 
        value={{user, 
                signup, 
                login, 
                logout,
                checkIfUserExists}}>{children}
        </AuthContext.Provider>)
}

export const UserAuth = ()  => {
    return useContext(AuthContext)
}