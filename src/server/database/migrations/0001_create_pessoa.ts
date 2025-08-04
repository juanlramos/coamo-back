import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.pessoa, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nomeCompleto").index().notNullable();
      table.string("email").unique().notNullable();

      table
        .bigInteger("cidadeId")
        .notNullable()
        .index()
        .references("id") //o campo cidadeId faz referencia para o campo Id da tabela cidade
        .inTable(ETableNames.cidade)
        .onUpdate("CASCADE") //caso o id de uma cidade seja substituido, atualiza para as pessaos que estão vinculadas a ela
        .onDelete("RESTRICT"); //não pode apagar um registro de cidade, se ele estiver vinculado a uma pessoa

      table.comment("Tabela de pessoa");
    })
    .then(() => {
      console.log(`Table ${ETableNames.pessoa} created successfully.`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pessoa).then(() => {
    console.log(`Table ${ETableNames.pessoa} dropped successfully.`);
  });
}
