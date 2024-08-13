import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PostAttendance from './components/Upload';
import YourAttendance from './components/YourAttendance';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path='/myattendance' element={<YourAttendance />} />
				<Route path="/attendance" element={<PostAttendance />} />
			</Routes>
		</Router>
	);
}

export default App;
