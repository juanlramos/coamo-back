// src/server/database/providers/usuarios/UpdateById.ts
import { Knex } from "../../knex";
import { IUsuario } from "../../models";
import { ETableNames } from "../../ETableNames";

// Define o tipo para os dados que podem ser atualizados
type IUsuarioUpdate = Omit<Partial<IUsuario>, "id">;

export const updateById = async (
  id: number,
  usuario: IUsuarioUpdate
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .where("id", "=", id)
      .update(usuario);

    if (result) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
