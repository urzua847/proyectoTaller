"use strict";
import Joi from "joi";

export const userQueryValidation = Joi.object({
  id: Joi.number().integer().positive(),
  email: Joi.string().email(),
  rut: Joi.string(),
})
  .or("id", "email", "rut") // Debe venir al menos uno de estos
  .messages({
    "object.missing": "Debes proporcionar al menos un parámetro: id, email o rut.",
  });

export const userBodyValidation = Joi.object({
  nombreCompleto: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  newPassword: Joi.string().min(6).allow(''), // Permite que la nueva contraseña esté vacía
  rut: Joi.string(),
  rol: Joi.string(),
  password: Joi.string(), // Para verificar la contraseña actual si se cambia
})
  .or("nombreCompleto", "email", "newPassword", "rut", "rol");