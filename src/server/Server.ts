import express from "express";
import cors from "cors";
import "dotenv/config";
import "./shared/services/TranslationsYup";
import { router } from "./routes";

const server = express();

server.use(
  cors({
    origin: process.env.ENABLED_CORS?.split(";") || [], //como o enabled_cors pode ser undefined
  })
); //assim libera o CORS para o frontend, passando a variavel ambiente com a lista de url dos fronts
server.use(express.json()); // para permitir o uso de JSON no corpo das requisições

//aqui a gente informa que o servidor vai usar nossas rotas
server.use(router);

export { server };
