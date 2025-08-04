import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log("Servidor rodando na porta", process.env.PORT || 3333);
  });
};


//configuração, para em produção rodar as migrations automaticas, mas em localhost so rodar o server
if (process.env.IS_LOCALHOST !== "true") {
  Knex.migrate
    .latest()
    .then(() => {
      startServer();
    })
    .catch(console.log);
} else {
  startServer();
}
