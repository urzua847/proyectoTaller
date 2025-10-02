"use strict";
import User from "../entity/user.entity.js";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";
import { ACCESS_TOKEN_SECRET } from "../config/configEnv.js";

export async function loginService(user) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = user;

    const userFound = await userRepository.findOne({ where: { email } });
    if (!userFound) return [null, { dataInfo: "email", message: "El correo electrónico es incorrecto" }];

    const isMatch = await comparePassword(password, userFound.password);
    if (!isMatch) return [null, { dataInfo: "password", message: "La contraseña es incorrecta" }];

    const payload = {
      nombreCompleto: userFound.nombreCompleto,
      email: userFound.email,
      rut: userFound.rut,
      rol: userFound.rol,
    };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    return [accessToken, null];
  } catch (error) {
    return [null, "Error interno del servidor"];
  }
}

export async function registerService(user) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { nombreCompleto, rut, email } = user;

    const existingEmail = await userRepository.findOne({ where: { email } });
    if (existingEmail) return [null, { dataInfo: "email", message: "Correo electrónico en uso" }];

    const existingRut = await userRepository.findOne({ where: { rut } });
    if (existingRut) return [null, { dataInfo: "rut", message: "Rut ya asociado a una cuenta" }];

    const newUser = userRepository.create({
      nombreCompleto,
      email,
      rut,
      password: await encryptPassword(user.password),
      rol: "usuario",
    });

    await userRepository.save(newUser);
    const { password, ...dataUser } = newUser;
    return [dataUser, null];
  } catch (error) {
    return [null, "Error interno del servidor"];
  }
}