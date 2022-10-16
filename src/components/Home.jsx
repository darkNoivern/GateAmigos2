import React from 'react'
import '../styles/home.css'
import homepage from '../images/homepage.svg'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <>
            <div className='home-page px-3 px-md-5'>
                <div className="row mx-0 my-5">
                    <div className="col col-12 col-lg-6 mb-4 mb-lg-5 flexy homepage-columns">
                        <div>
                            <div className='homepage-text text-white mouse600'>
                                Practicing here makes preparation perfect
                            </div>
                            <Link exact to="/problems" className='mouse400 ui button curve-btn bg-gate text-amigo my-3'>
                            {`Get Started`}<i class="arrow right icon"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col col-12 col-lg-6 mb-4 mb-lg-5 flexy p-0">
                        <img className='homepage-image' src={homepage} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home