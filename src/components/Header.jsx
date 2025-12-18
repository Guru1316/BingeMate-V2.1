import '../App.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ setActiveUser }) => {
    const navigate = useNavigate();

    const auth = localStorage.getItem("auth") === "true";
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("admin") === "true";

    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        localStorage.removeItem("activeUser");
        localStorage.removeItem("admin");

        setActiveUser(null);
        alert("Logged Out Successfully");
        navigate("/");
    };

    const titleHandler = () => {
        navigate("/");
    };

    return (
        <header className="header">
            <div className="tit">
                <img src={`${import.meta.env.BASE_URL}image.png`} alt="logo" />
                <h1 className="name" onClick={titleHandler}>
                    Binge <span className="mate">Mate</span>
                </h1>
            </div>

            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/publicreviews">Reviews</NavLink>

                {isAdmin && (
                    <NavLink to="/admin/dashboard">Admin</NavLink>
                )}

                {!isAdmin && auth && token && (
                    <>
                        <NavLink to="/diary">Diary</NavLink>
                        <NavLink to="/addSeries">Add Series</NavLink>
                        <NavLink to="/watchlist">Watchlist</NavLink>
                    </>
                )}

                {(auth || isAdmin) ? (
                    <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                        Logout
                    </a>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;