import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const Count = async (filter = ""): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("nome", "like", `%${filter}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao consultar a quantidade totald e registros");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar a quantidade totald e registros");
  }
};
