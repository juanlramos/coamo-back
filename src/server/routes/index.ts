import { Router } from "express";
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from "../controllers";

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

//rotas de pessoas
router.post(
  "/pessoas",
  PessoasController.createValidation,
  PessoasController.Create
);

router.get(
  "/pessoas",
  PessoasController.getAllValidation,
  PessoasController.GetAll
);

router.get(
  "/pessoas/:id",
  PessoasController.getByidValidation,
  PessoasController.GetById
);

router.put(
  "/pessoas/:id",
  PessoasController.updateByIdValidation,
  PessoasController.UpdateById
);

router.delete(
  "/pessoas/:id",
  PessoasController.deleteByIdValidation,
  PessoasController.DeleteById
);

//rotas de usuarios
router.post(
  "/cadastrar",
  UsuariosController.signUpValidation,
  UsuariosController.SignUp
);

router.post(
  "/entrar",
  UsuariosController.signInValidation,
  UsuariosController.SignIn
);

export { router };
