import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom'

import questions from '../database/questions.js'

import avatar1 from '../images/avatar1.svg';
import avatar2 from '../images/avatar2.svg';
import avatar3 from '../images/avatar3.svg';
import avatar4 from '../images/avatar4.svg';

import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";

import '../styles/question.css'
import { IconButton } from '@mui/material'
import { styled } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const NextPrevExpButton = styled(IconButton)({
    color: '#FFFFFF',
    border: '2px solid #FFFFFF',
    padding: '3px',
});


const Question = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [swi, setSwi] = useState(true);

    const substituteData = useSelector(state => state);
    const email = substituteData.email;
    const avatarid = substituteData.avatarid;
    const [optionSelected, setOptionSelected] = useState(-1);

    const discussEndRef = useRef(null)

    const avatarArr = [avatar1, avatar2, avatar3, avatar4];

    const [form, setForm] = useState({
        text: "",
        usermail: email,
        avatarid: avatarid,
        question: parseInt(id),
    });
    const [discuss, setDiscuss] = useState([]);
    const [allDiscuss, setAllDiscuss] = useState([]);

    const [user, setUser] = useState([]);

    const [ansDisplay, setAnsDisplay] = useState(false)

    const usersCollectionRef = collection(db, "userdetails");

    const discussCollectionRef = collection(db, "discuss");
    const sortRef = query(discussCollectionRef, orderBy('createdAt'));
    useEffect(() => {

        onSnapshot(sortRef, (snapshot) => {
            const allDiscuss = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })
            setDiscuss(
                allDiscuss.filter((discussobject, index) => {
                    return discussobject.question === parseInt(id)
                })
            )
        });

        onSnapshot(usersCollectionRef, (snapshot) => {
            const users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })
            console.log('allusers', users, id)
            console.log(substituteData.username)
            setUser(
                users.filter((ui, index) => {
                    return (ui.username === substituteData.username);
                })
            )
        });

    }, []);

    useEffect(() => {
        discussEndRef.current?.scrollIntoView();
    }, [discuss])

    const submitChat = () => {
        if (form.text) {
            addDoc(discussCollectionRef, {
                ...form, createdAt: serverTimestamp()
            });
            console.log(form);
            setForm({ ...form, text: "" });
        }
    }

    const handleSubmit = () => {
        let arr = user[0].answers;
        arr[parseInt(id) - 1] = optionSelected;
        let cnt = user[0].count;
        cnt = (optionSelected === questions[parseInt(id) - 1].answer ? cnt + 1 : cnt)
        const updateOBJ = {
            answers: arr,
            avatarid: user[0].avatarid,
            count: cnt,
            email: user[0].email,
            position: user[0].position,
            username: user[0].username,
        }
        setDoc(doc(db, 'userdetails', user[0].id), updateOBJ)
    }

    return (
        <>
            <div className='d-flex px-lg-5 px-3 my-3 my-md-4'>
                <div className='text-white mouse400'>
                    Question {`${parseInt(id)}`}
                </div>
            </div>
            <div className="container-fluid mt-4 question-box px-lg-5 px-3 mouse400">
                <div class="ui top attached tabular question-discuss-border menu">
                    <span
                        onClick={() => { setSwi(true); }}
                        className={(swi === true) ? `discuss-active bg-amigos text-white tabular-button item active` : `discuss-active bg-amigos text-white tabular-button item`}>
                        Question
                    </span>
                    <span
                        onClick={() => { setSwi(false); }}
                        className={(swi === false) ? `discuss-active bg-amigos text-white tabular-button item active` : `discuss-active bg-amigos text-white tabular-button item`}>
                        Discuss
                    </span>
                    {/* <div class="right menu">
                        <div class="item p-0">
                            <div class="ui transparent icon input text-white">
                            {parseInt(id)!==1 ? 
                            <Link
                            exact to={`/question/${parseInt(id)-1}`}>
                                <NextPrevExpButton 
                                className='me-2'><ArrowBackIcon /></NextPrevExpButton>
                            </Link>
                            :<></>
                            }
                            <Link
                            exact to={`/question/${parseInt(id)+1}`}>
                            
                                <NextPrevExpButton><ArrowForwardIcon /></NextPrevExpButton>
                            </Link>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div class={`ui bottom text-white bg-amigos attached segment bottom-segment ${swi === true ? "p-4 p-lg-5" : "p-0"}`}>
                    {
                        (parseInt(id) <= 0 || parseInt(id) > questions.length) ?
                            <>
                                <div className='flexy no-question-area'>
                                    <div>
                                        <div className='text-white error-page-text'>
                                            Error 404 Page
                                        </div>
                                        <div className='text-white error-page-text mt-2'>
                                            No Such Question
                                        </div>
                                        <div className='d-flex justify-content-evenly my-4'>
                                            {/* <Link exact to="/create" className="button mx-0 ui bg-gate text-amigos">
                                                Create One
                                            </Link> */}
                                            <Link exact to="/" className="button mx-0 ui bg-gate text-amigos">
                                                Go Back
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            (swi === true) ?
                                <div>
                                    {
                                        (user.length > 0 && user[0].answers[parseInt(id) - 1] === 100) ?
                                            <>
                                                <div className="question-div text-white">
                                                    {questions[parseInt(id) - 1].question}
                                                </div>
                                                <div className="option-div">
                                                    <div className="option mt-3 ps-3">
                                                        <div className='mb-1'>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" onClick={() => { setOptionSelected(0) }} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                                <span className='options-attempted text-white px-1 pb-1'>{questions[parseInt(id) - 1].a}</span>
                                                            </div>
                                                        </div>
                                                        <div className='mb-1'>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" onClick={() => { setOptionSelected(1) }} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                                <span className='options-attempted px-1 pb-1'>{questions[parseInt(id) - 1].b}</span>
                                                            </div>
                                                        </div>
                                                        <div className='mb-1'>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" onClick={() => { setOptionSelected(2) }} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                                <span className='options-attempted px-1 pb-1'>{questions[parseInt(id) - 1].c}</span>
                                                            </div>
                                                        </div>
                                                        <div className='mb-1'>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" onClick={() => { setOptionSelected(3) }} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                                <span className='options-attempted px-1 pb-1'>{questions[parseInt(id) - 1].d}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    optionSelected === (-1) ?
                                                        <button
                                                            onClick={() => (
                                                                handleSubmit()
                                                            )}
                                                            disabled
                                                            className="ui button bg-gate text-white my-4">
                                                            Submit
                                                        </button>
                                                        :
                                                        <button
                                                            onClick={() => (
                                                                handleSubmit()
                                                            )}
                                                            className="ui button bg-gate text-white my-4">
                                                            Submit
                                                        </button>
                                                }
                                            </>
                                            :
                                            <>
                                                {(user.length > 0) ?
                                                    <>
                                                        <div className="question-div">{
                                                            questions[parseInt(id) - 1].question}
                                                        </div>
                                                        <div className="option-div">
                                                            <div className="option mt-3 ps-3">
                                                                <div className='mb-1'>
                                                                    <div class="form-check form-check-inline">
                                                                        <input disabled class="form-check-input" type="radio" onClick={() => { setOptionSelected(0) }} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                                        <span
                                                                            className={`options-attempted px-1 pb-1 
                                                            ${(user[0].answers[parseInt(id) - 1] === 0 && (questions[parseInt(id) - 1].answer !== user[0].answers[parseInt(id) - 1])) ? "bg-danger text-white" : ""} 
                                                            ${questions[parseInt(id) - 1].answer === 0 ? "bg-success text-white" : ""}`}>
                                                                            {questions[parseInt(id) - 1].a}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <div class="form-check form-check-inline">
                                                                        <input disabled class="form-check-input" type="radio" onClick={() => { setOptionSelected(1) }} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                                        <span
                                                                            className={`options-attempted px-1 pb-1 
                                                            ${(user[0].answers[parseInt(id) - 1] === 1 && (questions[parseInt(id) - 1].answer !== user[0].answers[parseInt(id) - 1])) ? "bg-danger text-white" : ""} 
                                                            ${questions[parseInt(id) - 1].answer === 1 ? "bg-success text-white" : ""}`}>
                                                                            {questions[parseInt(id) - 1].b}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <div class="form-check form-check-inline">
                                                                        <input disabled class="form-check-input" type="radio" onClick={() => { setOptionSelected(2) }} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                                        <span
                                                                            className={`options-attempted px-1 pb-1 
                                                            ${(user[0].answers[parseInt(id) - 1] === 2 && (questions[parseInt(id) - 1].answer !== user[0].answers[parseInt(id) - 1])) ? "bg-danger text-white" : ""} 
                                                            ${questions[parseInt(id) - 1].answer === 2 ? "bg-success text-white" : ""}`}>
                                                                            {questions[parseInt(id) - 1].c}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <div class="form-check form-check-inline">
                                                                        <input disabled class="form-check-input" type="radio" onClick={() => { setOptionSelected(3) }} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                                        <span
                                                                            className={`options-attempted px-1 pb-1 
                                                            ${(user[0].answers[parseInt(id) - 1] === 3 && (questions[parseInt(id) - 1].answer !== user[0].answers[parseInt(id) - 1])) ? "bg-danger text-white" : ""} 
                                                            ${questions[parseInt(id) - 1].answer === 3 ? "bg-success text-white" : ""}`}>
                                                                            {questions[parseInt(id) - 1].d}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="explanation-explanation d-flex justify-content-between my-4 align-items-center">
                                                            Explanation
                                                            {
                                                                <NextPrevExpButton className='text-white' onClick={() => (setAnsDisplay(!ansDisplay))}>
                                                                    {ansDisplay === false ? <AddIcon /> : <RemoveIcon />}
                                                                </NextPrevExpButton>
                                                            }
                                                        </div>
                                                        {ansDisplay === true ?
                                                            (<div className="answer-part ps-3">
                                                                {questions[parseInt(id) - 1].explanation}
                                                            </div>) :
                                                            (<div className="answer-part ps-3" style={{ display: "none" }}>
                                                                {questions[parseInt(id) - 1].explanation}
                                                            </div>)
                                                        }
                                                    </>
                                                    :
                                                    <>not loaded</>

                                                }
                                            </>
                                    }

                                </div>
                                :
                                <div className='discuss-section'>
                                    <div className='discuss-chat-show'>
                                        {
                                            discuss.map((message, index) => {
                                                return (
                                                    <>
                                                        {
                                                            email === message.usermail ?

                                                                <div key={index} className="d-flex justify-content-end my-4">
                                                                    <div className='d-flex justify-content-end'>
                                                                        <div className="chat-own-message bg-gate py-2 px-3">
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
                                                                        <div className="chat-message text-dark bg-chat py-2 px-3">
                                                                            {message.text}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                        <div ref={discussEndRef} />
                                    </div>
                                    <div className='d-flex pt-3 pb-2 px-2 type-box justify-content-between'>
                                        <input
                                            value={form.text}
                                            type="text"
                                            onChange={(event) => {
                                                setForm({ ...form, text: event.target.value });
                                            }}
                                            onKeyPress={(event) => {
                                                if (event.key === "Enter" && form.text !== "") {
                                                    submitChat();
                                                }
                                            }}
                                            placeholder="Type to discuss...."
                                            className='form-control mouse400 bg-amigos text-white chat-input me-4'
                                        />

                                        {
                                            (form.text === "") ?
                                                <button disabled
                                                    onClick={() => { submitChat() }}
                                                    className='mouse600 mx-0 bg-gate text-amigos button ui send-chat-btn'>
                                                    Send
                                                </button>
                                                :
                                                <button
                                                    onClick={() => { submitChat() }}
                                                    className='mouse600 mx-0 button bg-gate text-amigos ui send-chat-btn'>
                                                    Send
                                                </button>
                                        }
                                    </div>

                                </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Question