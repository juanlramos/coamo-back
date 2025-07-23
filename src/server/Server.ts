import express from "express";
import "dotenv/config";
import { router } from "./routes";
import "./shared/services/TranslationsYup";

const server = express();

//aqui a gente informa que o servidor vai usar nossas rotas
server.use(express.json()); // para permitir o uso de JSON no corpo das requisições
server.use(router);

export { server };
