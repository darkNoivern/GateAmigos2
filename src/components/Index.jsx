import React, { useEffect } from 'react'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/index.css'
import Home from './Home';
import Chat from './Chat'
import Blogs from './Blogs'
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import Create from './Create';
import Problems from './Problems';
import Question from './Question';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Error from './Error';
import Blog from './Blog';
import Profile from './Profile'

const Index = () => {
    
    const substituteData = useSelector(state => state);
    console.log(substituteData)
    const [user, setUser] = useState(substituteData.loggedin);
    const [avatarID, setAvatarID] = useState(substituteData.avatarid);

    const toggleUser = (set) => {
        setUser(set)
    }
    useEffect(()=>{
        if(user){
            setAvatarID(substituteData.avatarid)
        }
    },[user])

    return (
        <>
            <Router>
                <Navbar user={user} username={substituteData.username} avatarid={substituteData.avatarid} toggleUser={toggleUser} />
                <div className="scrollOptimize">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/chat" element={user === true ? <Chat /> : <SignIn toggleUser={toggleUser} /> } />
                        {/* <Route exact path="/blogs" element={user === true ? <Blogs /> : <SignIn toggleUser={toggleUser} /> } /> */}
                        <Route exact path="/blogs" element={<Blogs />} />
                        <Route exact path="/create" element={user === true ? <Create /> : <SignIn toggleUser={toggleUser} /> } />
                        <Route exact path="/problems" element={ user === true ? <Problems /> : <SignIn toggleUser={toggleUser} /> } />
                        <Route exact path="/leaderboard" element={ user === true ? <Leaderboard /> : <SignIn toggleUser={toggleUser} /> } />
                        <Route exact path='/question/:id' element={ user === true ? <Question /> : <SignIn toggleUser={toggleUser} /> } />
                        <Route exact path='/blog/:id' element={<Blog />} />
                        <Route exact path="/signin" element={<SignIn toggleUser={toggleUser} />} />
                        <Route exact path="/signup" element={<SignUp toggleUser={toggleUser} />} />
                        <Route path= '*' element={<Error />} />
                        <Route exact path='user/:id' element={ user === true ? <Profile /> : <SignIn toggleUser={toggleUser} /> } />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default Index