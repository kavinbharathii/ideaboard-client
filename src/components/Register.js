// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                username,
                password,
                isGuard: true,
                phoneNumber: phoneNumber,
            }, {
                withCredentials: true,
            });

            if (response.status === 201) {
                console.log('Registration successful');
                navigate('/login');
            }
        } catch (error) {
            setError(`Registration failed. Please try again. ${error.response?.message}`);
            console.error('Registration error:', error.response?.message);
        }
    };

    return (
        <div className={styles.container} style={{ maxWidth: '400px', margin: 'auto' }}>
            <form className={styles.form} onSubmit={handleRegister}>
                <h1>Register</h1>
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
                    <input
                        className={styles.inputBox}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                        />
                </div>
                <div>
                    <input
                        className={styles.inputBox}
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Your phone number"
                        required
                    />
                </div>
                <div>
                    <button className={styles.button} type="submit">Register</button>
                    <p className={styles.subText}>Already an user? <Link className={styles.redirectLink} to="/login">Login Here</Link></p>
                </div>

            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Register;
