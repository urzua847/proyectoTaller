import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../styles/form.css';

const Form = ({ title, fields, buttonText, onSubmit, footerContent }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
        >
            <h1>{title}</h1>
            {fields.map((field, index) => (
                <div className="container_inputs" key={index}>
                    {field.label && <label htmlFor={field.name}>{field.label}</label>}
                    <input
                        {...register(field.name, {
                            required: field.required ? 'Este campo es obligatorio' : false,
                            minLength: field.minLength ? { value: field.minLength, message: `Debe tener al menos ${field.minLength} caracteres` } : false,
                            pattern: field.pattern ? { value: field.pattern, message: field.patternMessage || 'Formato no válido' } : false,
                        })}
                        name={field.name}
                        placeholder={field.placeholder}
                        type={field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                        onChange={field.onChange}
                    />
                    <div className={`error-message ${errors[field.name] || field.errorMessageData ? 'visible' : ''}`}>
                        {errors[field.name]?.message || field.errorMessageData || ''}
                    </div>
                </div>
            ))}
            {buttonText && <button type="submit">{buttonText}</button>}
            {footerContent && <div className="footerContent">{footerContent}</div>}
        </form>
    );
};

export default Form;