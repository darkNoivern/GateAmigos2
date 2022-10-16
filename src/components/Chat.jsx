import React from 'react'
import '../styles/chat.css'
import avatar1 from '../images/avatar1.svg';
import avatar2 from '../images/avatar2.svg';
import avatar3 from '../images/avatar3.svg';
import avatar4 from '../images/avatar4.svg';
import { useState, useEffect, useRef } from 'react'
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

const Chat = () => {

    const substituteData = useSelector(state => state);
    const email = substituteData.email;
    const avatarid = substituteData.avatarid;

    const messagesEndRef = useRef(null)

    const [chats, setChats] = useState([]);
    const [form, setForm] = useState({
        text: "",
        usermail: email,
        avatarid: avatarid,
    });

    const avatarArr = [avatar1,avatar2,avatar3,avatar4];

    const chatsCollectionRef = collection(db, "chats");
    const sortRef = query(chatsCollectionRef, orderBy('createdAt'));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            setChats(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    }, []);

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView();
    },[chats])

    const submitChat = () => {
        if (form.text) {
            addDoc(chatsCollectionRef, {
                ...form, createdAt: serverTimestamp()
            });
            console.log("submitted");
            setForm({ ...form, text: "" });
        }
    }

    return (
        <div className="page px-lg-5 px-md-4 px-sm-3 px-2">
            <div className='chat-section mouse400'>
                {
                    chats.map((message, index) => {
                        return (
                            <>
                            {
                                email===message.usermail ? 

                                <div key={index} className="d-flex justify-content-end my-4">
                                    <div className='d-flex justify-content-end'>
                                        <div className="chat-own-message bg-gate text-white py-2 px-3">
                                            {message.text}
                                        </div>
                                        <div className='mx-2'>
                                            <img className='profile-avatar-chat-section' src={avatarArr[message.avatarid]} alt="" />
                                        </div>
                                    </div>
                                </div>
                                :
                                
                                <div key={index} className="d-flex justify-content-start my-4">
                                    <div className='d-flex justify-content-start'>
                                        <div className='mx-2'>
                                            <img className='profile-avatar-chat-section' src={avatarArr[message.avatarid]} alt="" />
                                        </div>
                                        <div className="chat-message py-2 px-3 bg-chat text-amigos">
                                            {message.text}
                                        </div>
                                    </div>
                                </div>
                            }
                            </>
                        )
                    })
                }
                <div ref={messagesEndRef} />
            </div>
            <div className='d-flex mt-2 py-3 py-sm-2 type-box justify-content-between'>
                <input
                    value={form.text}
                    type="text"
                    onChange={(event) => {
                        setForm({ ...form, text: event.target.value });
                    }}
                    onKeyPress={(event)=>{
                        // console.log(event.key)
                        if(event.key==="Enter" && form.text!==""){
                            submitChat();
                        }
                    }}
                    placeholder='Enter your text...'
                    className='mouse400 form-control chat-input me-4 bg-amigos text-white'
                />

                {
                    (form.text === "") ?
                        <button disabled 
                        onClick={() => { submitChat() }} 
                        className='mx-0 mouse600 button ui bg-gate text-amigos send-chat-btn'>
                            Send
                        </button>
                        :
                        <button
                        onClick={() => { submitChat() }} 
                        className='mx-0 mouse600 button ui bg-gate text-amigos send-chat-btn'>
                            Send
                        </button>
                }
            </div>
        </div>
    )
}

export default Chat