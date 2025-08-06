import * as yup from "yup";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middlewares";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { PasswordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((get) => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().email().required().min(5),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const SignIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  //desestrutura o req.body
  const { email, senha } = req.body;

  //busca os dados do usuario pelo email
  const result = await UsuariosProvider.GetByEmail(email);

  //se deu erro na busca, o user não ta autorizado
  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou Senha Invalidos",
      },
    });
  }

  //se a senha informada é diferente da senha no banco de dados, não está autorizado
  const passwordMatch = await PasswordCrypto.verifyPassword(
    senha,
    result.senha
  );
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou Senha Invalidos",
      },
    });
  } else {
    //se deu tudo certo, o status é ok e gera um token de acesso
    return res.status(StatusCodes.OK).json({
      accessToken: "teste.teste.teste",
    });
  }
};
