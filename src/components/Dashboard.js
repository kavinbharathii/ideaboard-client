
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';

const Dashboard = () => {

    const [attendanceRecords, setAttendanceRecords] = useState([]);

    // get all the attendance posts from the guards
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/admin/guards/all');

            try {
                const attendanceRecords = response.data.attendanceRecords;
                setAttendanceRecords(attendanceRecords);
                console.log(attendanceRecords);
            } catch (error) {
                console.log("Error fetching data");
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
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
                            <img src={`http://localhost:5000/${selfieUrl}`} alt="attendance" width="200" />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Dashboard;
