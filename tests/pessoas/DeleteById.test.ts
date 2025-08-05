import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - DeleteById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "cidade teste",
    });
    cidadeId = resCidade.body;
  });

  it("Deleta registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId,
      email: "testepessoa@gmail.com",
      nomeCompleto: "nome Pessoa",
    });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/pessoas/${res1.body}`).send();

    expect(resApagada.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("Tenta deletar um registro que não existe", async () => {
    const res1 = await testServer.delete("/pessoas/99999").send();
    expect(res1.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
