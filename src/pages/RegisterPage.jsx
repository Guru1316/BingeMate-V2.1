import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import API from "../utils/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/register", {
        email,
        password,
      });

      if (response.data.status === "Success") {
        alert("Registration Successful! Please Login.");
        navigate("/login"); 
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed."
      );
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleRegister}>
        <h2>Register</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="loginButton" type="submit">
          Register
        </button>

        <Link to="/login" className="register">
          Already Have An Account? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;