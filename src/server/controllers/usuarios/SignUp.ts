import * as yup from "yup";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middlewares";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { EmailConfirm, JWTService } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, "id" | "emailConfirmado"> {}

export const signUpValidation = validation((get) => ({
  body: get<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      email: yup.string().email().required().min(5),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const SignUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await UsuariosProvider.Create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  //gera um token de autenticação para confirmar o email
  const accessToken = JWTService.sign({ uid: result });

  if (accessToken === "JWT_SECRET_NOT_FOUND") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro ao gerar o token de acesso.",
      },
    });
  }

  //link para o endpoint de validação
  const confirmationLink = `${process.env.BASE_URL}/usuarios/confirmar-email?token=${accessToken}`;

  //html para enviar no email
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h2>Por favor, confirme seu email</h2>
      <p>Clique no botão abaixo para confirmar seu endereço de e-mail.</p>
      <a 
        href="${confirmationLink}" 
        style="
          display: inline-block;
          padding: 12px 24px;
          margin: 20px 0;
          font-size: 16px;
          color: white;
          background-color: #007bff;
          border-radius: 5px;
          text-decoration: none;
        "
      >
        Confirmar Email
      </a>
      <p>Se você não se cadastrou, por favor ignore este e-mail.</p>
    </div>
  `;

  //envio de email de confirmação
  const resultEmail = await EmailConfirm(req.body.email, emailHtml);

  if (resultEmail instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: resultEmail.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
