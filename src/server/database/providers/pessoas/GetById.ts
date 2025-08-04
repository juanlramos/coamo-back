import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const GetById = async (id: number): Promise<IPessoa | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Erro ao consultar registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar registro");
  }
};
