import { Request, Response } from "express";
import * as yup from "yup";

interface ICidade {
  nome: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup
    .string()
    .required("O nome da cidade é obrigatório")
    .min(3, "O nome da cidade deve ter pelo menos 3 caracteres"),
});

export const Create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  try {
    const validatedData = await bodyValidation.validate(req.body);

    console.log(validatedData);
    return res.send("Create!");
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.errors,
      },
    });
  }
};
