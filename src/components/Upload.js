

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostAttendance() {
    const [username, setUsername] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [file, setFile] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);

    const handleAttendance = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        try {
            const response = await axios.post('http://localhost:5000/attendance/upload', formData);

            if (response.status === 201) {
                console.log('Post successful');
                navigate('/');
            } else if (response.status === 401) {
                navigate('/login');
            } else if (response.status === 400) {
                setError(`Failed to post attendance, since you posted within the last hour`);
            } else {
                setError(`Failed to post attendance. Internal server error, please try again later.`);
            }
        } catch (error) {
            setError(`Failed to post attendance. Please try again.`);
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