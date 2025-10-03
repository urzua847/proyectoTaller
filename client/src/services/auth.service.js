import axios from './root.service.js';
import cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export async function login(dataUser) {
    try {
        const response = await axios.post('/auth/login', dataUser);
        const { status, data } = response;
        if (status === 200) {
            const decodedToken = jwtDecode(data.data.token);
            const userData = {
                nombreCompleto: decodedToken.nombreCompleto,
                email: decodedToken.email,
                rut: decodedToken.rut,
                rol: decodedToken.rol
            };
            sessionStorage.setItem('usuario', JSON.stringify(userData));
            cookies.set('jwt-auth', data.data.token, { path:'/' });
            return response.data;
        }
    } catch (error) {
        return error.response.data;
    }
}

export async function register(data) {
    try {
        const response = await axios.post('/auth/register', data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function logout() {
    try {
        await axios.post('/auth/logout');
        sessionStorage.removeItem('usuario');
        cookies.remove('jwt-auth');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}