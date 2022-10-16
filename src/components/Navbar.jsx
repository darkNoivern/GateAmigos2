import React, { useEffect } from 'react';
import '../styles/navbar.css'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import avatar1 from '../images/avatar1.svg'
import avatar2 from '../images/avatar2.svg'
import avatar3 from '../images/avatar3.svg'
import avatar4 from '../images/avatar4.svg'

const Navbar = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const imgarr = [avatar1, avatar2, avatar3, avatar4];

    const logout = () => {
        props.toggleUser(false)
        navigate('/signin')
        dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light">
            <div className="container-fluid">
                <Link exact to="/" className="navbar-brand text-white color40 py-2">
                    {/* Jekyll OS */}
                    GateAmigos
                </Link>

                <button
                    className="navbar-toggler voltorb-navbar-toggler bg-gate"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse mt-2" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink
                                exact to={'/'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Home
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Home
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                exact to={'/problems'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Problems
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/problems'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Problems
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                exact to={'/blogs'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Blogs
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/blogs'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Blogs
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                exact to={'/create'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Create
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/create'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Create
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                exact to={'/chat'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Chat
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/chat'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Chat
                                </span>
                            </NavLink>
                        </li>


                        <li className="nav-item">
                            <NavLink
                                exact to={'/leaderboard'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Leaderboard
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/leaderboard'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Leaderboard
                                </span>
                            </NavLink>
                        </li>

                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                            (props.user === true) ?
                                <>
                                    <li className="nav-item">
                                        <Link
                                            exact to={`/user/${props.username}`}
                                            activeclassname="active"
                                            className="nav-link d-sm-none px-md-2">
                                            <img
                                                data-bs-target="#navbarNav" data-bs-toggle="collapse"
                                                className='navbar-profile' src={imgarr[props.avatarid]} alt="profile-pic" />
                                        </Link>
                                        <Link
                                            exact to={`/user/${props.username}`}
                                            activeclassname="active"
                                            className="nav-link d-none d-sm-block px-md-2">
                                            <img
                                                // data-bs-target="#navbarNav" data-bs-toggle="collapse"
                                                className='navbar-profile' src={imgarr[props.avatarid]} alt="profile-pic" />
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink
                                            onClick={() => (logout())}
                                            exact to={'/signin'}
                                            activeclassname="active"
                                            className="nav-link d-sm-none">
                                            <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                                Logout
                                            </span>
                                        </NavLink>
                                        <NavLink
                                            onClick={() => (logout())}
                                            exact to={'/signin'}
                                            activeclassname="active"
                                            className="nav-link d-none d-sm-block mt-2">
                                            <span>
                                                Logout
                                            </span>
                                        </NavLink>
                                    </li>

                                </>
                                :
                                <>

                                    <li className="nav-item">
                                        <NavLink
                                            exact to={'/signin'}
                                            activeclassname="active"
                                            className="nav-link d-sm-none">
                                            <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                                SignIn
                                            </span>
                                        </NavLink>
                                        <NavLink
                                            exact to={'/signin'}
                                            activeclassname="active"
                                            className="nav-link d-none d-sm-block">
                                            <span>
                                                SignIn
                                            </span>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink
                                            exact to={'/signup'}
                                            activeclassname="active"
                                            className="nav-link d-sm-none">
                                            <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                                SignUp
                                            </span>
                                        </NavLink>
                                        <NavLink
                                            exact to={'/signup'}
                                            activeclassname="active"
                                            className="nav-link d-none d-sm-block">
                                            <span>
                                                SignUp
                                            </span>
                                        </NavLink>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar