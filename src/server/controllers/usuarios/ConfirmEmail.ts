// src/server/controllers/usuarios/ConfirmEmail.ts
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { JWTService } from "../../shared/services";
import { UsuariosProvider } from "../../database/providers/usuarios";

// Interface para o query param
interface IQueryProps {
  token?: string;
}

// Middleware de validação para a query
export const confirmEmailValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      token: yup.string().required(),
    })
  ),
}));

// Controller principal
export const ConfirmEmail = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const { token } = req.query;

  // Verifica o token
  const jwtData = JWTService.verify(token!);
  if (jwtData === "JWT_SECRET_NOT_FOUND" || jwtData === "INVALID_TOKEN") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Token de confirmação inválido ou expirado." },
    });
  }

  // Token é válido, vamos atualizar o usuário
  const result = await UsuariosProvider.updateById(jwtData.uid, {
    emailConfirmado: true,
  });
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  // Tudo certo, envie uma resposta de sucesso
  return res.status(StatusCodes.OK).send(`
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-g">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmado</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f0f2f5;
        font-family: Arial, sans-serif;
      }
      .container {
        text-align: center;
        padding: 40px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .icon {
        color: #28a745;
        font-size: 50px;
      }
      h1 {
        color: #333;
        margin-top: 20px;
      }
      p {
        color: #666;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="icon">✓</div>
      <h1>Email confirmado com sucesso!</h1>
      <p>Você já pode fechar esta aba.</p>
    </div>
  </body>
  </html>
`);
};
