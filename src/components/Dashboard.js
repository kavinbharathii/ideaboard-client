
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Dashboard = () => {

    // const [cookie, setCookie] = useState('');

    // useEffect(async () => {
        // const cookieValue = await Cookies.get('userid');
        // console.log(cookieValue)
        // console.log(cookieValue.userid)
        // setCookie(cookieValue);
    // }, [])

    const handleClick = () => {
        // const response = await axios.get('http://localhost:5000/dashboard');
        // console.log(response);
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            console.log(typeof position.coords.latitude);
            // return { lat: position.coords.latitude, long: position.coords.longitude };
        });
    }

    return (
        <div>
            <h1 onClick={handleClick}>Dashboard</h1>
        </div>
    );
}

export default Dashboard;
