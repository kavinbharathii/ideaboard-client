
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import { redirect } from 'react-router-dom';

const YourAttendance = () => {

    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [userName, setUserName] = useState('');

    // get all the attendance posts from the guards
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/user/guards/myattendance', {
                withCredentials: true,
            });

            if (response.status === 401) {
                redirect('/login');
            } else {
                const fetchedAttendanceRecords = response.data.attendanceRecords;
                const fetchedUserName = response.data.username;
                setAttendanceRecords(fetchedAttendanceRecords);
                setUserName(fetchedUserName);
                console.log(fetchedUserName);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {
                attendanceRecords.length === 0 ? (
                    <h1>No attendance records found for user {userName}</h1>
                ) : (
                    <div>

                        <h1>Hello, {userName}</h1>
                        <div className={styles.container}>
                            <h3>Username</h3>
                            <h3>Latitude</h3>
                            <h3>Longitude</h3>
                            <h3>Timestamp</h3>
                            <h3>Selfie</h3>
                        </div>
                        {
                            attendanceRecords.map((record, index) => {
                                const selfieUrl = record.selfie.split('\\')[1];
                                return (
                                    <div key={index} className={styles.container}>
                                        <h3>{record.user}</h3>
                                        <p>{record.latitude}</p>
                                        <p>{record.longitude}</p>
                                        <p>{Date(record.timestamp).split(' ').splice(1, 4).join(' ')}</p>
                                        <img src={`http://localhost:5000/auth/getimage/${selfieUrl}`} alt="attendance" width="200" />
                                    </div>
                                );
                            })
                        }
                    </div>

                )
            }
        </div>
    );
}

export default YourAttendance;
