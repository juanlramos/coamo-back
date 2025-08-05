import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { IPessoa } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IPessoa, "id"> {}

export const updateByIdValidation = validation((get) => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().email().required(),
      cidadeId: yup.number().integer().required(),
      nomeCompleto: yup.string().required().min(3),
    })
  ),
  params: get<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const UpdateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "o parametro 'id' é obrigatório",
      },
    });
  }

  const result = await PessoasProvider.UpdateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
