
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Attendance Management App</h1>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
            <br />
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
}

export default Home;