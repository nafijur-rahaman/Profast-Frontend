import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from './AuthContext';


const AuthContextProvider = ({children}) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
    

    const handleSignUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
      };

    const handleLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
      };
    
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo

        });
      };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
      };

      const logOutUser = () => {
        return signOut(auth);
      }
    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);


    const conextValue = {
        user,
        loading,
        handleSignUp,
        handleLogin,
        logOutUser,
        updateUserProfile,
        signInWithGoogle
    }

    return (
        
        <AuthContext.Provider value={conextValue}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContextProvider;