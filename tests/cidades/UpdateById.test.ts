import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById", () => {
  it("Atualiza registro por id", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Teste Cidade",
    });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resBuscada = await testServer.put(`/cidades/${res1.body}`).send({
      nome: "Cidade Atualizada",
    });

    expect(resBuscada.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("Tenta atualizar um registro que não existe", async () => {
    const res1 = await testServer.put("/cidades/99999").send({
      nome: "Cidade Inexistente",
    });
    expect(res1.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
