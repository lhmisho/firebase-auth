import React, {useState} from "react";
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "./firebase-auth";

firebase.initializeApp(firebaseConfig);

function App() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const [user, setUser] = useState({
        isAuthenticated: false,
        name: '',
        email: '',
        photoUrl: ''
    })

    const signInHangler = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result)
                let user = {
                    isAuthenticated: true,
                    name: result.user.displayName,
                    email: result.user.email,
                    photoUrl: result.user.photoURL
                }
                setUser(user)
            }).catch((error) => {
                console.log(error)
                console.log(error.message)
            });
    }
    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            const user = {
                isAuthenticated: false,
                name: '',
                email: '',
                photoUrl: ''
            }
            setUser(user)
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className="App">
            {
                !user.isAuthenticated ? <button onClick={signInHangler}>Sign In</button>
                :
                    <>
                        <h4>Your are logged In as: {user.name}</h4>
                        <h4>Your are logged In as: {user.email}</h4>
                        <img src={user.photoUrl} alt=""/>
                        <button onClick={handleSignOut}>Sign Oout</button>
                    </>
            }

        </div>
    );
};

export default App;
