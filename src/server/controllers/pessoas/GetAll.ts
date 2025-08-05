import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { PessoasProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((get) => ({
  query: get<IQueryProps>(
    yup.object().shape({
      filter: yup.string().default(""),
      page: yup.number().integer().moreThan(0).default(1),
      limit: yup.number().integer().moreThan(0).default(7),
    })
  ),
}));

export const GetAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const result = await PessoasProvider.GetAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || ""
  );
  const count = await PessoasProvider.Count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message,
      },
    });
  }

  res.setHeader("acess-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  res.status(StatusCodes.OK).json(result);
};
