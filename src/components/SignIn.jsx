import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/signin.css'

import { useState, useEffect } from 'react';
import { auth } from '../firebase.config';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { collection } from 'firebase/firestore';
import { db } from '../firebase.config';
import { addDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';

const SignIn = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [err, setErr] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [username, setUserName] = useState("");
    const [avatarID, setAvatarID] = useState(1);

    //  FIREBASE
    const usersCollectionRef = collection(db, "userdetails");
    useEffect(() => {
        onSnapshot(usersCollectionRef, (snapshot) => {
            setUserlist(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    }, []);

    //  SIGNUP FUNCTION
    const signInWithGoogle = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                const user = auth.currentUser;

                const checkEmailPresent = userlist.find((individual) => {
                    return (individual.email === user.email);
                })

                if (checkEmailPresent === undefined) {

                    setAlert(true);
                    //  LOGOUT AUTH
                    props.toggleUser(false)
                    dispatch({
                        type: 'LOGOUT',
                    });

                    return;
                }

                userlist.forEach((individual) => {
                    console.log(individual);
                    if (individual.email === user.email) {
                        setAvatarID(individual.avatarid);
                        setUserName(individual.username);

                        //  REDUX
                        const payloadOBJ = {
                            username: individual.username,
                            email: user.email,
                            avatarid: individual.avatarid,
                        }

                        //  TOGGLE : REDUX : NAVIGATE
                        props.toggleUser(true);
                        dispatch({
                            type: 'SIGNIN',
                            payload: payloadOBJ,
                        });
                        navigate('/problems');

                        return ;
                    }
                })
            })
            .catch((error) => {
                setErr(true)
                console.log(error);
            });
    };

    return (
        <>
            <div className="page px-3 px-md-5 flexy">
                <div className='sign-in-box'>
                    {/* ERROR MESSAGE */}
                    {err === true ? (
                        <>
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <div>
                                    <i className="fas fa-exclamation-triangle" />&nbsp;
                                    Something went wrong TRY AGAIN !!
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    {/* ALERT MESSAGE */}
                    {alert === true ? (
                        <>
                            <div className="alert alert-warning d-flex align-items-center" role="alert">
                                <div>
                                    <i className="fas fa-exclamation-triangle" />
                                    &nbsp;This mail is not present in database ; Try to &nbsp;
                                    <Link className="text-valentine" exact to="/signup">
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    <div className='flexy text-white'>
                        <button
                            onClick={() => {
                                signInWithGoogle();
                                setErr(false);
                                setAlert(false);
                            }}
                            className='button ui bg-gate text-white mouse400 sign-round sign-btn mx-0 my-3'>
                            <i class="google icon me-2"></i>
                            Sign In with Google
                        </button>
                    </div>
                    <div className="flexy">
                        <Link className='text-white mouse400' exact to="/signup" >Don't have an account ??</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn