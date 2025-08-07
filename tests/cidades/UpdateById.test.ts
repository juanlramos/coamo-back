import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-cidade@gmail.com";

    await testServer.post("/cadastrar").send({
      nome: "teste",
      email: email,
      senha: "123456",
    });

    const signInRes = await testServer.post("/entrar").send({
      email: email,
      senha: "123456",
    });

    accessToken = signInRes.body.accessToken;
  });

  it("Atualiza registro por id", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({
        Authorization: `Bearer ${accessToken}`,
      })
      .send({
        nome: "Teste Cidade",
      });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);

    const resBuscada = await testServer.put(`/cidades/${res1.body}`).send({
      nome: "Cidade Atualizada",
    });

    expect(resBuscada.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("Tenta atualizar um registro que não existe", async () => {
    const res1 = await testServer
      .put("/cidades/99999")
      .set({
        Authorization: `Bearer ${accessToken}`,
      })
      .send({
        nome: "Cidade Inexistente",
      });
    expect(res1.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
