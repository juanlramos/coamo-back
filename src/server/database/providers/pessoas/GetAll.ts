import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const GetAll = async (
  page: number,
  limit: number,
  filter: string
): Promise<IPessoa[] | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select("*")
      .where("nomeCompleto", "like", `%${filter}%`)
      /**
       * o offset serve para paginar os registros
       * exemplo, pagina 1 - 1 = 0 * limit(10) = 0 , vai pegar do zero pra frente os 10 registros
       * exemplo 2 pagina 2 - 1 = 1 * limit(10) = 10, vai pegar do 10 pra frente os 10 registros
       * e assim por diante...
       */
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar registros");
  }
};
