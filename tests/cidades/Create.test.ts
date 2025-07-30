import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
  it("Cria registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Teste Cidade",
    });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);
    expect(typeof res1.body).toBe("number");
  });

  it("Cria um nome muito curto", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Ci",
    });
    expect(res1.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
});
