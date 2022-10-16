import React from 'react'
import { Link } from 'react-router-dom'
const Error = () => {
    return (
        <>
            <div className="page px-3 px-md-5 flexy">
                <div>
                    <div className='text-white error-page-text'>
                        Error 404 Page
                    </div>
                    <div className='d-flex justify-content-evenly my-4'>
                        <Link exact to="/" className="button mx-0 ui bg-gate text-amigos">
                            Go Back
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error