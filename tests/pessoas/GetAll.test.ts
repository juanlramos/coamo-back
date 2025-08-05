import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - GetAll", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "cidade teste",
    });
    cidadeId = resCidade.body;
  });

  it("Busca todos os registros", async () => {
    const res1 = await testServer.post("/pessoas").send({
      cidadeId,
      email: "testepessoa@gmail.com",
      nomeCompleto: "nome Pessoa",
    });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/pessoas").send();

    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toBe(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
