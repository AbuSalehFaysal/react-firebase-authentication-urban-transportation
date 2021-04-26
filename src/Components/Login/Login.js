import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.login';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword } from './LoginManager';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // Initialize Firebase
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setLoggedInUser(signedInUser);
                history.replace(from);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const createUserWithEmailAndPassword = (name, email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                const newUserInfo = res.user;
                newUserInfo.error = '';
                newUserInfo.success = true;
                updateUserName(name);
                return newUserInfo;
            })
            .catch(error => {
                const newUserInfo = {};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                return newUserInfo;
            });
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const signInWithEmailAndPassword = (email, password) =>{
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          const {name, email, password} = newUserInfo;
          const signedInUser = {
            isSignedIn: true,
            name: name,
            email: email
          };
          return newUserInfo;
        })
        .catch(function(error) {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
     }

     const updateUserName = name =>{
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log('user name updated successfully')
        }).catch(function(error) {
          console.log(error)
        });
      }
    return (
        <div className="text-center">
            <br />
            <br />
            <br />
            <Button onClick={handleGoogleSignIn} variant="outline-danger">Continue With Google</Button>
            <br />
            <br />
            <h6>Sign-in with Email and Password</h6>
            <p style={{ color: 'red' }}>{user.error}</p>
            { user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name" required />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
            </form>
            
        </div>
    );
};

export default Login;