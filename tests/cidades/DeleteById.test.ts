import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - DeleteById", () => {
  it("Deleta registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Teste Cidade",
    });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/cidades/${res1.body}`).send();

    expect(resApagada.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("Tenta deletar um registro que não existe", async () => {
    const res1 = await testServer.delete("/cidades/99999").send();
    expect(res1.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
