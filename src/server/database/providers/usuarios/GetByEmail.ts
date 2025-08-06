import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const GetByEmail = async (email: string) => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select("*")
      .where("email", "=", email)
      .first();

    if (result) return result;

    return new Error("registro não encontrado");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar o registro");
  }
};
