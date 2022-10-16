import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { db } from "../firebase.config";
import '../styles/blog.css'
import blog1 from '../images/blog1.svg';
import blog2 from '../images/blog2.svg';
import blog3 from '../images/blog3.svg';
import blog4 from '../images/blog4.svg';
import { Link } from 'react-router-dom';
import { auth } from '../firebase.config';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc,
    query,
    serverTimestamp,
    getDocFromCache,
    orderBy,
} from "firebase/firestore";
import { useSelector } from 'react-redux';

const Blog = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const blogarr = [blog1, blog2, blog3, blog4];

    const blogsCollectionRef = collection(db, "blogs");
    useEffect(() => {
        onSnapshot(blogsCollectionRef, (snapshot) => {
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

    useEffect(() => {
        if (blogs !== []) {
            const obj = blogs.filter((blog, index) => {
                return (blog.id === id.toString());
            });
            setBlog(obj);
        }
    }, [blogs])

    return (
        <>
            <div className="page px-lg-5 px-md-4 px-sm-3 px-2">
                {
                    (blog.length === 0) ?
                        <>
                            <div className="page px-lg-5 px-md-4 px-sm-3 px-2 flexy">
                                <div className='mouse400'>
                                    <div className='text-white error-page-text'>
                                        Error 404 Page
                                    </div>
                                       <div className='text-white error-page-text mt-2'>
                                        No Such Blog
                                       </div>
                                    <div className='d-flex justify-content-evenly my-4'>
                                        <Link exact to="/create" className="mouse600 button mx-0 ui bg-gate text-amigos">
                                            Create One
                                        </Link>
                                        <Link exact to="/" className="mouse600 button mx-0 ui bg-gate text-amigos">
                                            Go Back
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="page px-lg-5 px-md-4 px-sm-3 px-2">
                                <div className='py-5 flexy'>
                                <div className='p-3 blog-page-image'>
                                    <img className='blog-personal-image' src={blogarr[blog[0].blogpicture]} alt="" />
                                </div>
                                </div>
                                <div className='mt-5'>
                                    <figure class="text-end text-white">
                                        <blockquote class="blockquote text-white">
                                            <p>{blog[0].blogtitle}</p>
                                        </blockquote>
                                        <figcaption class="blockquote-footer">
                                            <cite title="Source Title">{blog[0].writer}</cite>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className='text-white mt-3 mb-5'>
                                    {blog[0].blogdescription}
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default Blog