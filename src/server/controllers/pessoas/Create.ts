import * as yup from "yup";

import { IPessoa } from "../../database/models";
import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { PessoasProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IPessoa, "id"> {}

export const createValidation = validation((get) => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      cidadeId: yup.number().integer().required(),
      nomeCompleto: yup.string().required().min(3),
    })
  ),
}));

export const Create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await PessoasProvider.Create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
