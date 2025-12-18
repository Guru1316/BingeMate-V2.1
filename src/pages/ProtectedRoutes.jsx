import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const auth = localStorage.getItem("auth");
    const token = localStorage.getItem("token");
    if (auth === "true" && token) {
        return children;
    }
    return <Navigate to={"/login"} replace></Navigate>;
};

export default ProtectedRoute;