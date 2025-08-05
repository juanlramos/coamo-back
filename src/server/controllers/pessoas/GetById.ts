import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PessoasProvider } from "../../database/providers/pessoas";

//interface
interface IParamProps {
  id?: number;
}

//validação
export const getByidValidation = validation((get) => ({
  params: get<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

//controller
export const GetById = async (req: Request<IParamProps>, res: Response) => {
  //se o id não foi informado
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "o parametro 'id' precisa ser informado.",
      },
    });
  }

  //se deu erro no provider de getById
  const result = await PessoasProvider.GetById(req.params.id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  //se deu tudo certo retorna o status 'ok' e o result
  return res.status(StatusCodes.OK).json(result);
};
