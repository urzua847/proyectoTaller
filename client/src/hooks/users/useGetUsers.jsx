import { useState, useEffect } from 'react';
import { getUsers } from '@services/user.service.js';

const useUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            // Filtramos al usuario logueado para que no aparezca en la tabla
            const loggedUserRut = JSON.parse(sessionStorage.getItem('usuario'))?.rut;
            const filteredData = response.filter(user => user.rut !== loggedUserRut);
            setUsers(filteredData);
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, fetchUsers, setUsers };
};

export default useUsers;