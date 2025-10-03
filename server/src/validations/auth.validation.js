// server/src/validations/auth.validation.js
"use strict";
import Joi from "joi";

// --- Login sin cambios ---
export const authValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "any.required": "El correo electrónico es obligatorio.",
      "string.email": "El formato del correo no es válido.",
    }),
  password: Joi.string()
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
    }),
}).unknown(false).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});


// --- Registro con validaciones más flexibles ---
export const registerValidation = Joi.object({
  nombreCompleto: Joi.string()
    .min(3) // <-- Reducido de 15 a 3
    .max(50)
    .required()
    .messages({
      "string.empty": "El nombre completo no puede estar vacío.",
      "any.required": "El nombre completo es obligatorio.",
      "string.min": "El nombre completo debe tener al menos 3 caracteres.",
    }),
  rut: Joi.string() // <-- Se eliminó el patrón complejo
    .required()
    .messages({
      "string.empty": "El rut no puede estar vacío.",
    }),
  email: Joi.string()
    .email() // <-- Se eliminó la restricción de @gmail.cl
    .required()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "any.required": "El correo electrónico es obligatorio.",
      "string.email": "El formato del correo no es válido.",
    }),
  password: Joi.string()
    .min(5) // <-- Reducido de 8 a 6
    .required()
    // Se eliminó el patrón para permitir cualquier caracter
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.min": "La contraseña debe tener al menos 6 caracteres.",
    }),
})
  .unknown(false)
  .messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});