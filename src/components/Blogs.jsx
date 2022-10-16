import React from 'react'
import '../styles/blogs.css'
import blog1 from '../images/blog1.svg';
import blog2 from '../images/blog2.svg';
import blog3 from '../images/blog3.svg';
import blog4 from '../images/blog4.svg';
import { useNavigate } from 'react-router-dom'
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

import { Link } from 'react-router-dom'
import moment from 'moment'

const Blogs = () => {

    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);

    const blogarr = [blog1, blog2, blog3, blog4];

    const blogsCollectionRef = collection(db, "blogs");
    const sortRef = query(blogsCollectionRef, orderBy('createdAt', 'desc'));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            setBlogs(
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
            <div className="page px-3 px-md-5">
                <div className="my-3 text-white">Blog List</div>
                <div>
                    <div className="row mx-0">
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
                </div>
            </div>
        </>
    )
}

export default Blogs