import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  //se no header não tem a autenticação, ja retorna o erro
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Não autenticado.",
      },
    });
  }

  //vamos usar um bearer token, então dividimos entre o BEARER e o token (o token sempre vem com bearer na frente)
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Não autenticado.",
      },
    });
  }

  //verifica o token
  const jwtData = JWTService.verify(token);

  //se não foi encontrado chave de acesso, é erro do servidor
  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro ao verificar o token de acesso.",
      },
    });
  } else if (jwtData === "INVALID_TOKEN") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Não autenticado.",
      },
    });
  }

  //coloca o id do usuario no header
  req.headers.idUsuario = jwtData.uid.toString();

  return next();
};
