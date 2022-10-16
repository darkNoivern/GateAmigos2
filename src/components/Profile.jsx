import React from 'react'
import '../styles/profile.css'
import avatar1 from '../images/avatar1.svg';
import avatar2 from '../images/avatar2.svg';
import avatar3 from '../images/avatar3.svg';
import avatar4 from '../images/avatar4.svg';

import blog1 from '../images/blog1.svg';
import blog2 from '../images/blog2.svg';
import blog3 from '../images/blog3.svg';
import blog4 from '../images/blog4.svg';

import { Link } from 'react-router-dom';
import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const Profile = () => {

    const { id } = useParams();
    console.log('id', id)
    const avatararr = [avatar1, avatar2, avatar3, avatar4];

    const blogarr = [blog1, blog2, blog3, blog4];

    const [user, setUser] = useState([]);

    const [blogs, setBlogs] = useState([]);

    const usersCollectionRef = collection(db, "userdetails");
    useEffect(() => {
        onSnapshot(usersCollectionRef, (snapshot) => {
            const users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })
            setUser(
                users.filter((ui, index) => {
                    return (ui.username === id);
                })
            )
        });
    }, [id]);


    const blogsCollectionRef = collection(db, "blogs");
    const sortRef = query(blogsCollectionRef, orderBy('createdAt'));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            const arr =
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            setBlogs(
                arr.filter((ui, index) => {
                    return ui.writer === id
                })
            )
        });
    }, [id]);


    return (
        <div className='page px-3 px-md-5'>
            {
                (user.length > 0) ?
                    <div>
                        <div className="flexy mt-5 mb-3">
                            <img className="profile-profile-image" src={avatararr[user[0].avatarid]} alt="" />
                        </div>
                        <div className='flexy text-righteous text-white my-2'>
                            {user[0].username}
                        </div>
                        <div className='flexy text-righteous text-white my-2'>
                            {user[0].email}
                        </div>

                        <div className='text-white text-righteous mt-5'>
                            <u>My Blogs</u>
                        </div>
                        {
                            blogs.map((blog, index) => {
                                return (
                                    <>
                                        <div key={index} className='col col-12 col-md-6 col-lg-4 card-col mb-3 flexy'>
                                            <div className="card mouse400 blog-show-card bg-amigos text-white p-2">
                                                <img src={blogarr[blog.blogpicture]} class="card-img-top mt-1 mb-2" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title mouse600">
                                                        {blog.blogtitle}
                                                    </h5>
                                                    <Link exact to={`/blog/${blog.id}`} className="mouse600 button ui bg-gate text-amigo my-2">
                                                        Open Blog
                                                    </Link>
                                                </div>
                                                <div className="card-footer d-flex justify-content-between">
                                                    <Link className='text-gate' exact to={`/user/${blog.writer}`}>
                                                        {blog.writer}
                                                    </Link>
                                                    <div>{moment(blog.createdAt.toDate()).calendar()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    :
                    <>
                        no user
                    </>
            }
        </div>
    )
}

export default Profile