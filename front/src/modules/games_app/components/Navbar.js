import React from 'react';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../providers/authProvider';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (auth.user == null)
            navigate('/login');
    }, [auth.user, navigate]);
    
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link
                className="navbar-brand p-3"
                to="/"
            >
                MERN
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink
                        className={({ isActive }) => isActive ? "active" : "nav-item nav-link"}
                        exact="true"
                        to="/"
                    >
                        Videojuegos
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => isActive ? "active" : "nav-item nav-link"}
                        exact="true"
                        to="/coleccion"
                    >
                        Colección
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => isActive ? "active" : "nav-item nav-link"}
                        exact="true"
                        to="/logs"
                    >
                        Logs
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <NavLink
                        className={({ isActive }) => isActive ? "active" : "nav-item nav-link"}
                        exact="true"
                        to="/login"
                        onClick={auth.logout}
                    >
                        Cerrar sesión de {auth.user && auth.user.username}
                    </NavLink>
                </ul>
            </div>
        </nav>
    )
} 