import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll", () => {
  it("Busca todos os registros", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Teste Cidade",
    });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/cidades").send();

    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toBe(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
