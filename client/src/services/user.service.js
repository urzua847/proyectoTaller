import axios from './root.service.js';
import { formatUserData } from '../helpers/formatData.js';

export async function getUsers() {
    try {
        const { data } = await axios.get('/user');
        // Damos formato a los datos recibidos (fechas, mayúsculas, etc.)
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(data, rut) {
    try {
        const response = await axios.patch(`/user/detail?rut=${rut}`, data);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

export async function deleteUser(rut) {
    try {
        const response = await axios.delete(`/user/detail?rut=${rut}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}