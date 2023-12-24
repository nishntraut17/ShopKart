import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const Protected = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return (
            <Navigate
                to={"/"}
                replace={true}
            />
        )
    }
    return children;
}

export const Public = ({ children }) => {
    return children;
}

export const Seller = ({ children }) => {
    const user = jwtDecode(localStorage.getItem("token"));

    if (user.role === 'seller') {
        return children;
    }
    return (
        <Navigate
            to={"/"}
            replace={true}
        ></Navigate>
    );
};

export const Admin = ({ children }) => {
    const user = jwtDecode(localStorage.getItem("token"));

    if (user.role === 'admin') {
        return children;
    }
    return (
        <Navigate
            to={"/"}
            replace={true}
        ></Navigate>
    );
};
