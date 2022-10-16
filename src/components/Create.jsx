import React from 'react'
import { useState, useEffect } from "react";
import '../styles/create.css'

import blog1 from '../images/blog1.svg';
import blog2 from '../images/blog2.svg';
import blog3 from '../images/blog3.svg';
import blog4 from '../images/blog4.svg';

import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import {
    collection,
    onSnapshot,
    // doc,
    addDoc,
    // deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { useSelector } from 'react-redux';

const Create = () => {

    const [imageNumber, setImageNumber] = useState(0);
    const [blogTitle,setBlogTitle] = useState("");
    const [description,setDescription] = useState("");

    const substituteData = useSelector(state => state);
    const email = substituteData.email;
    const avatarid = substituteData.avatarid;
    const writer = substituteData.username;

    
    const [blogs, setBlogs] = useState([]);

    const [form, setForm] = useState({
        blogpicture: imageNumber,
        blogtitle: blogTitle,
        blogdescription: description,
        writer: writer,
        usermail: email,
        avatarid: avatarid,
        lovereact: 0,
    });

    
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

    const submitBlog = () => {
        if (form.blogtitle && form.blogdescription) {
            addDoc(blogsCollectionRef, {
                ...form, createdAt: serverTimestamp()
            });
            console.log("submitted");
            setForm({ ...form, blogtitle: "", blogdescription: "" });
        }
        console.log(form);
    }

    return (
        <>
            <div className='create-page blog-container px-md-5 px-3 mt-5'>
                <div className="row mx-0 d-flex justify-content-between">
                    <div className="col col-12 col-md-6 col-lg-3 flexy">
                        <div 
                        onClick={()=>{
                            setImageNumber(0);
                            setForm({ ...form, blogpicture: 0 });
                        }}
                        className='ui bg-amigos raised segment p-3 blog-picture-selection image-card mb-3'>
                            {
                                (imageNumber===0) ? 
                                <>
                                <span class="ui left corner label"><i class="heart icon"></i></span>
                                </>:<></>
                            }
                            <img className='blog-picture-selection-image' src={blog1} alt="" />
                        </div>
                    </div>
                    <div className="col col-12 col-md-6 col-lg-3 flexy">
                        <div onClick={()=>{
                            setImageNumber(1);
                            setForm({ ...form, blogpicture: 1 });
                        }}
                        className='ui bg-amigos raised segment p-3 blog-picture-selection image-card mb-3'>
                            {
                                (imageNumber===1) ? 
                                <>
                                <span class="ui left corner label"><i class="heart icon"></i></span>
                                </>:<></>
                            }
                            <img className='blog-picture-selection-image' src={blog2} alt="" />
                        </div>
                    </div>
                    <div className="col col-12 col-md-6 col-lg-3 flexy">
                        <div 
                        onClick={()=>{
                            setImageNumber(2);
                            setForm({ ...form, blogpicture: 2 });
                        }}
                        className='ui bg-amigos raised segment p-3 blog-picture-selection image-card mb-3'>
                            {
                                (imageNumber===2) ? 
                                <>
                                <span class="ui left corner label"><i class="heart icon"></i></span>
                                </>:<></>
                            }
                            <img className='blog-picture-selection-image' src={blog3} alt="" />
                        </div>
                    </div>
                    <div className="col col-12 col-md-6 col-lg-3 flexy">
                        <div
                        onClick={()=>{
                            setImageNumber(3);
                            setForm({ ...form, blogpicture: 3 });
                        }} 
                        className='ui bg-amigos raised segment p-3 blog-picture-selection image-card mb-3'>
                            {
                                (imageNumber===3) ? 
                                <>
                                <span class="ui left corner label"><i class="heart icon"></i></span>
                                </>:<></>
                            }
                            <img className='blog-picture-selection-image' src={blog4} alt="" />
                        </div>
                    </div>
                </div>

                {
                    //  ERROR PART
                }

                <div className='mt-5'>
                    <label for="exampleFormControlInput1" class="mouse400 text-white form-label">Blog Title</label>
                    <input 
                    onChange={(event)=>{setForm({ ...form, blogtitle: event.target.value });}}
                    type="text" 
                    class="mouse400 text-white form-control create-white-blog bg-amigos form-input-blog-heading" 
                    id="exampleFormControlInput1" />
                </div>
                <div class="form-floating mt-3">
                    <textarea 
                    onChange={(event)=>{setForm({ ...form, blogdescription: event.target.value });}}
                    class="mouse400 text-white form-control bg-amigos create-white-blog form-textarea-blog" 
                    rows="3" 
                    placeholder="Leave a comment here" 
                    id="floatingTextarea2"></textarea>
                    <label className='mouse400 text-white' for="floatingTextarea2">Description</label>
                </div>
                {
                    ((form.blogtitle === "") || (form.blogdescription === "")) ?  
                    <button
                    disabled 
                    onClick={()=>{submitBlog()}}
                    className='ui bg-gate mouse600 text-amigos button mt-3 mb-5'>
                    Publish
                    </button>:
                    <button 
                    onClick={()=>{submitBlog()}}
                    className='ui bg-gate mouse600 text-amigos button mt-3 mb-5'>
                        Publish
                    </button>
                }
            </div>
        </>
    )
}

export default Create