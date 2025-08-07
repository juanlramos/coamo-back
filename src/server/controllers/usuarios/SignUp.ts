import * as yup from "yup";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middlewares";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { EmailConfirm } from "../../shared/services";

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

  //envio de email de confirmação
  const resultEmail = await EmailConfirm(req.body.email);

  if (resultEmail instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: resultEmail.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
