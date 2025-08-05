import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - GetById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "cidade teste",
    });
    cidadeId = resCidade.body;
  });

  it("Busca registro por id", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId,
      email: "testepessoa@gmail.com",
      nomeCompleto: "nome Pessoa",
    });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/pessoas/${res1.body}`).send();

    expect(resBuscada.statusCode).toBe(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nomeCompleto");
  });

  it("Tenta buscar um registro que não existe", async () => {
    const res1 = await testServer.get("/pessoas/99999").send();
    expect(res1.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
