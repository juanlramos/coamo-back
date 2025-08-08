import knex from "knex";
import "dotenv/config";
import pg from "pg";
import { development, production, test } from "./Environment";

if (process.env.NODE_ENV === "production") {
  //tratamento para os dados serem tratados como inteiro
  pg.types.setTypeParser(20, "text", parseInt);

  /**
   * caso outro dado esteja vindo como string e não deveria
   * CTRL + CLICK no setTypeParser
   * CTRL + CLICK no typeId e verifica o codigo do tipo (ex: BOOL = 16)
   */
}

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return production;
    case "test":
      return test;
    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
