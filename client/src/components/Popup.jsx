import Form from './Form';
import '@styles/popup.css';

export default function Popup({ show, setShow, data, action }) {
    const userData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        // Filtrar campos vacíos para no enviar datos innecesarios
        const nonEmptyData = Object.fromEntries(
            Object.entries(formData).filter(([_, v]) => v !== "")
        );
        action(nonEmptyData);
    };

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>X</button>
                    <Form
                        title="Editar usuario"
                        fields={[
                            { label: "Nombre completo", name: "nombreCompleto", defaultValue: userData.nombreCompleto || "" },
                            { label: "Correo electrónico", name: "email", defaultValue: userData.email || "" },
                            { label: "RUT", name: "rut", defaultValue: userData.rut || "" },
                            { label: "Rol", name: "rol", defaultValue: userData.rol || "" },
                            { label: "Nueva contraseña (opcional)", name: "newPassword", placeholder: "**********", type: "password" }
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Guardar Cambios"
                    />
                </div>
            </div>
            )}
        </div>
    );
}