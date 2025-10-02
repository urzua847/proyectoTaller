"use strict";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DB_HOST, PORT } from "./config/configEnv.js";
import { connectDB } from "./config/configDb.js";
import indexRoutes from "./routes/index.routes.js";

async function setupServer() {
  try {
    const app = express();
    app.disable("x-powered-by");

    app.use(cors({ credentials: true, origin: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use("/api", indexRoutes); 

    // Aquí irán las rutas, ej: app.use("/api", indexRoutes);

    app.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${DB_HOST}:${PORT}/api`);
    });

  } catch (error) {
    console.log("Error en setupServer: ", error);
  }
}

async function setupAPI() {
  try {
    await connectDB();
    await setupServer();
  } catch (error) {
    console.log("Error en setupAPI: ", error);
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) => console.log("Error al iniciar la API: ", error));