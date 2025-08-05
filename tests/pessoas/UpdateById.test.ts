import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - UpdateById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "cidade teste",
    });
    cidadeId = resCidade.body;
  });

  it("Atualiza registro por id", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId,
      email: "testepessoa@gmail.com",
      nomeCompleto: "nome Pessoa",
    });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resBuscada = await testServer.put(`/pessoas/${res1.body}`).send({
      cidadeId,
      email: "testepessoa@gmail.com",
      nomeCompleto: "nome atualizado",
    });

    expect(resBuscada.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("Tenta atualizar um registro que não existe", async () => {
    const res1 = await testServer.put("/pessoas/99999").send({
      cidadeId,
      email: "testepessoa@gmail.com",
      nomeCompleto: "nome atualizado",
    });
    expect(res1.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
