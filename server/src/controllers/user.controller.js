"use strict";
import {
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "../services/user.service.js";
import { userBodyValidation, userQueryValidation } from "../validations/user.validation.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function getUsers(req, res) {
  try {
    const [users, errorUsers] = await getUsersService();
    if (errorUsers) return handleErrorClient(res, 404, errorUsers);
    handleSuccess(res, 200, "Usuarios encontrados", users);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateUser(req, res) {
    try {
      const { rut } = req.query;
      const { body } = req;

      const { error: queryError } = userQueryValidation.validate({ rut });
      if (queryError) return handleErrorClient(res, 400, "Error en la consulta", queryError.message);

      const { error: bodyError } = userBodyValidation.validate(body);
      if (bodyError) return handleErrorClient(res, 400, "Error en los datos", bodyError.message);

      const [user, userError] = await updateUserService({ rut }, body);
      if (userError) return handleErrorClient(res, 400, "Error al modificar", userError);

      handleSuccess(res, 200, "Usuario modificado", user);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }

  export async function deleteUser(req, res) {
    try {
      const { rut } = req.query;
      const { error } = userQueryValidation.validate({ rut });
      if (error) return handleErrorClient(res, 400, "Error en la consulta", error.message);

      const [user, errorUser] = await deleteUserService({ rut });
      if (errorUser) return handleErrorClient(res, 404, "Error al eliminar", errorUser);

      handleSuccess(res, 200, "Usuario eliminado", user);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }