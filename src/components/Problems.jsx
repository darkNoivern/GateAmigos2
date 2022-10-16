import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import '../styles/problems.css'
import { useNavigate } from 'react-router-dom'
import questions from '../database/questions.js'

const Problems = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='page px-3 px-md-5 py-5'>
                <div className="row mx-0">
                    {
                        [...Array(questions.length)].map((element, index) => {
                            return (
                                <>
                                    <div key={index} className='d-flex justify-content-center col col-4 col-sm-2 my-2'>
                                        <button
                                        onClick={() => { navigate(`/question/${index + 1}`) }}
                                        className='ui inverted basic button problemButton'>
                                            {index + 1}
                                            {/* <DoneIcon /> */}
                                        </button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Problems