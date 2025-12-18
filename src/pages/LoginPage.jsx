import { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import API from "../utils/api";

const Login = () => {
  const { setActiveUser } = useOutletContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin", "true");
      alert("Admin Login Successful");
      navigate("/admin/dashboard");
      return;
    }

    try {
      const response = await API.post("/auth/login", { email, password });

      if (response.data.status === "Success") {
        const { token, email: userEmail } = response.data.data;
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", token);
        localStorage.setItem("activeUser", userEmail);
        localStorage.removeItem("admin");

        setActiveUser(userEmail);
        alert("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Login Page</h2>

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        <button className="loginButton" type="submit">
          Login
        </button>

        <Link to="/register" className="register">
          Don't Have An Account? Register
        </Link>
      </form>
    </div>
  );
};

export default Login;