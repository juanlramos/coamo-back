import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const Create = async (
  pessoa: Omit<IPessoa, "id">
): Promise<number | Error> => {
  try {
    //busca na tabela de cidades o cidadeId informado para a criação da pessoa.
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("id", "=", pessoa.cidadeId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade usada no cadastro não foi encontrada");
    }

    const [result] = await Knex(ETableNames.pessoa)
      .insert(pessoa)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return new Error("Erro ao criar registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar registro");
  }
};
