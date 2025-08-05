import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - Create", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "cidade teste",
    });
    cidadeId = resCidade.body;
  });

  it("Cria registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId,
      email: "testepessoa@gmail.com",
      nomeCompleto: "nome Pessoa",
    });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);
    expect(typeof res1.body).toBe("number");
  });

  it("Cria um nome muito curto", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId,
      email: "testepessoa@gmail.com",
      nomeCompleto: "no",
    });
    expect(res1.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });
});
