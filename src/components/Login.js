
// now login page
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Form.module.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // using `withCredentials: true` to send cookies with the request
            // if not used, the server will not be able to set the session cookie.
            // for more info, check https://jakearchibald.com/2021/cors/

            const response = await axios.post('http://localhost:5000/auth/login', {
                username,
                password,
            }, { 
                withCredentials: true
            });
            
            if (response.status === 200) {
                console.log('Login successful');
                navigate('/');
            }
        } catch (error) {
            setError(`Login failed. Please try again.`);
            console.error('Login error:', error.response?.message);
            navigate('/login')
        }
    };

    return (
        <div className={styles.container} style={{ maxWidth: '400px', margin: 'auto' }}>
            <form className={styles.form} onSubmit={handleLogin}>
                <h1>Login</h1>
                <div>
                    <input
                        className={styles.inputBox}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your username"
                        required
                    />
                </div>
                <div>
                    <input
                        className={styles.inputBox}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                        required
                    />
                </div>
                <div>
                    <button className={styles.button} type="submit">Login</button>
                    <p className={styles.subText}>Don't have an account? <Link className={styles.registerLink} to="/register">Register Here</Link></p>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;