import { Router } from "express";
import { CidadesController } from "../controllers";

const router = Router();

//rota principal
router.get("/", (_, res) => {
  return res.send("Funcionando!");
});

//rotas de cidades
router.post(
  "/cidades",
  CidadesController.createValidation,
  CidadesController.Create
);

router.get(
  "/cidades",
  CidadesController.getAllValidation,
  CidadesController.GetAll
);

router.get(
  "/cidades/:id",
  CidadesController.getByIdValidation,
  CidadesController.GetById
);

router.put(
  "/cidades/:id",
  CidadesController.updateByIdValidation,
  CidadesController.UpdateById
);

router.delete(
  "/cidades/:id",
  CidadesController.deleteByIdValidation,
  CidadesController.DeleteById
);

export { router };
