import React, {useState} from "react";
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "./firebase-auth";


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}
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
    const handleBlur = (e) => {
        const newUser = {...user}
        newUser[e.target.name] = e.target.value
        setUser(newUser)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
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
            <h1>Own authentication system</h1>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="email" onBlur={handleBlur} placeholder="email" required/>
                <br/>
                <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default App;
