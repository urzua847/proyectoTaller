import { useState } from 'react';
import { updateUser } from '@services/user.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatUserData } from '@helpers/formatData.js';

const useEditUser = (setUsers) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataUser, setDataUser] = useState([]);

    const handleClickUpdate = () => {
        if (dataUser.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedUserData) => {
        if (updatedUserData) {
            try {
                console.log("Datos del usuario a editar:", dataUser); 

                const updatedUser = await updateUser(updatedUserData, dataUser[0].rut);
                showSuccessAlert('¡Actualizado!', 'El usuario ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedUser = formatUserData(updatedUser);

                setUsers(prevUsers => prevUsers.map(user => 
                    user.rut === formattedUser.rut ? formattedUser : user
                ));

                setDataUser([]);
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el usuario.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataUser,
        setDataUser
    };
};

export default useEditUser;