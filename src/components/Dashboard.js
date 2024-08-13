
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';

const Dashboard = () => {

    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [adminAccess, setAdminAccess] = useState(false);

    // get all the attendance posts from the guards
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/user/admin/all', {
                withCredentials: true,
            });

            // see if the req user is an admin
            if (response.status === 200) {
                const attendanceRecords = response.data.attendanceRecords;
                setAttendanceRecords(attendanceRecords);
                setAdminAccess(true);
                console.log(attendanceRecords);
            } else if (response.status === 401) {
                console.log("Admin access denied");
                setAdminAccess(false)
            } else {
                console.log("Internal server error");
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {
                adminAccess === false ? (
                    <h1>Admin access denied</h1>
                ) : (
                    <>
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
                                        <img src={`http://localhost:5000/auth/getimage/${selfieUrl}`} alt="attendance" width="200" />
                                    </div>
                                );
                            })
                        }
                    </>
                )
            }
        </div>
    )
}

export default Dashboard;
