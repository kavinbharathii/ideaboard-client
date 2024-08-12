

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostAttendance() {
    const [username, setUsername] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [file, setFile] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAttendance = async (e) => {
        e.preventDefault();

        await navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', username);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        try {
            const response = await axios.post('http://localhost:5000/attendance/upload', formData);

            if (response.status === 200) {
                console.log('Post successful');
                navigate('/dashboard');
            }
        } catch (error) {
            setError(`Post failed`);
            console.error('Post error', error.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h1>Post attendance</h1>
            <form onSubmit={handleAttendance}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required
                    />
                </div>
                <div>
                    <label>File</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        placeholder="Enter file"
                        required
                    />
                </div>

                <button type="submit">Post</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PostAttendance;