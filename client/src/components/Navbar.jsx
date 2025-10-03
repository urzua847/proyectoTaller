import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../services/auth.service.js';
import '../styles/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = user?.rol;

    const logoutSubmit = () => {
        logout();
        navigate('/auth'); 
    };

    return (
        <nav className="navbar">
            <div className="nav-menu">
                <ul>
                    <li><NavLink to="/home">Inicio</NavLink></li>
                    {userRole === 'administrador' && (
                        <li><NavLink to="/users">Usuarios</NavLink></li>
                    )}
                    <li><a href="/auth" onClick={logoutSubmit}>Cerrar sesión</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;