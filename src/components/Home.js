
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { redirect } from "react-router-dom";

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAuthInfo = async () => {
            const response = await axios.get('http://localhost:5000/auth/info', {
                withCredentials: true
            });

            if (response.status === 201) {
                setIsLoggedIn(response.data.isLoggedIn);
                setIsAdmin(response.data.isAdmin);

                if (!isLoggedIn) {
                    redirect('/login');
                }
            } else {
                setError('Internal server error');
            }
        }

        fetchAuthInfo();

    }, [isLoggedIn]);

    const logoutHandler = async () => {
        const response = await axios.get('http://localhost:5000/auth/logout', {
            withCredentials: true
        });

        if (response.status === 200) {
            setIsLoggedIn(false);
            setIsAdmin(false);
            redirect('/');
        } else {
            setError('Internal server error');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>

                <h3>Attendance Management App</h3>
                {
                    !isLoggedIn && !isAdmin && (
                        <>
                            <Link className={styles.activeLink} to="/login">Login</Link>
                            <br />
                            <Link className={styles.passiveLink} to="/register">Register</Link>
                        </>
                    )
                }

                {
                    isLoggedIn && !isAdmin && (
                        <>
                            <Link className={styles.activeLink} to="/myattendance">Your Attendance</Link>
                            <br />
                            <Link className={styles.passiveLink} to="/attendance">Post Attendance</Link>
                        </>
                    )
                }

                {
                    isLoggedIn && isAdmin && (
                        <>
                            <Link className={styles.activeLink} to="/dashboard">Dashboard</Link>
                        </>
                    )
                }
                <br />
                <span className={styles.passiveLink} onClick={logoutHandler}>Logout</span>
                {
                    error && <p style={{ color: 'red' }}>{error}</p>
                }
            </div>
        </div>
    )
}

export default Home;
