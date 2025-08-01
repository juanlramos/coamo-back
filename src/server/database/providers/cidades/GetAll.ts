import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const GetAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<ICidade[] | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select("*")
      .where("id", "=", Number(id))
      .orWhere("nome", "like", `%${filter}%`)
      /**
       * o offset serve para paginar os registros
       * exemplo, pagina 1 - 1 = 0 * limit(10) = 0 , vai pegar do zero pra frente os 10 registros
       * exemplo 2 pagina 2 - 1 = 1 * limit(10) = 10, vai pegar do 10 pra frente os 10 registros
       * e assim por diante...
       */
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar registros");
  }
};
