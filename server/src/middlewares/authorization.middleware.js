"use strict";
import { handleErrorClient } from "../handlers/responseHandlers.js";

export async function isAdmin(req, res, next) {
  try {
    const { rol } = req.user;

    if (rol !== "administrador") {
        return handleErrorClient(res, 403, "Acceso denegado", "Se requiere rol de administrador.");
    }
    next(); 
  } catch (error) {
    return handleErrorClient(res, 403, "Error de autorización.");
  }
}