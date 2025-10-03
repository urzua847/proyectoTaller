"use strict";
import passport from "passport";
import { handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";

export function authenticateJwt(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return handleErrorServer(res, 500, "Error de autenticación en el servidor");
    }
    if (!user) {
      return handleErrorClient(res, 401, "No autorizado", { info: info ? info.message : "Token inválido o no proporcionado" });
    }
    req.user = user;
    next();
  })(req, res, next);
}