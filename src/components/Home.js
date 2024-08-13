
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 100: not logged in
    // 101: not admin
    // 200: admin
    // 401: not found

    useEffect(() => {
        const fetchAuthInfo = async () => {
            const response = await axios.get('http://localhost:5000/auth/info', {
                withCredentials: true
            });

            if (response.status === 201) {
                setIsLoggedIn(response.data.isLoggedIn);
                setIsAdmin(response.data.isAdmin);
            } else {
                setError('Internal server error');
            }
        }

        fetchAuthInfo();

    }, [])

    const logoutHandler = async () => {
        const response = await axios.get('http://localhost:5000/auth/logout', {
            withCredentials: true
        });

        if (response.status === 200) {
            setIsLoggedIn(false);
            setIsAdmin(false);
            navigate('/');
        } else {
            setError('Internal server error');
        }
    }

    return (
        <div>
            <h1>Attendance Management App</h1>
            {
                !isLoggedIn && !isAdmin && (
                    <>
                        <Link to="/login">Login</Link>
                        <br />
                        <Link to="/register">Register</Link>
                    </>
                )
            }

            {
                isLoggedIn && !isAdmin && (
                    <>
                        <Link to="/myattendance">Your Attendance</Link>
                        <br />
                        <Link to="/attendance">Attendance</Link>
                    </>
                )
            }

            {
                isLoggedIn && isAdmin && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                    </>
                )
            }
            <br />
            <span onClick={logoutHandler}>Logout</span>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
        </div>
    )
}

export default Home;
