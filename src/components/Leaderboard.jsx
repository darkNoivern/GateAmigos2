import React from 'react'
import '../styles/leaderboard.css'
import { db } from "../firebase.config";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux";
import {
    // collection,
    // onSnapshot,
    doc,
    setDoc,
    addDoc,
    deleteDoc,
    // query,
    serverTimestamp,
    // orderBy,
} from "firebase/firestore";

const Leaderboard = () => {

    const [userlist, setUserlist] = useState([]);

    const chatCollectionRef = collection(db, "userdetails");
    const sortRef = query(chatCollectionRef, orderBy("count", "desc"));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
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

    return (
        <>
            <div className="page px-3 px-md-5 mouse400">
                <div className='py-5 flexy leaderboard-title text-gate'>
                    Leaderboard
                </div>
                <div className='flexy'>

                    <table class="table leaderboard-table">
                        <thead className='bg-gate text-amigos'>
                            <tr>
                                <th className='text-center' scope="col">Username</th>
                                <th className='text-center' scope="col">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userlist.map((user, index) => {
                                    return (
                                        <>
                                            <tr className='bg-white'>
                                                <td className='text-center'>
                                                <Link className='text-dark' exact to={`/user/${user.username}`}>
                                                {user.username}
                                                </Link>
                                                </td>
                                                <td className='text-center'>{user.count}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default Leaderboard