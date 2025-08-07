import { Router } from "express";
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from "../controllers";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

//rota principal
router.get("/", (_, res) => {
  return res.send("Funcionando!");
});

//rotas de cidades
router.post(
  "/cidades",
  ensureAuthenticated,
  CidadesController.createValidation,
  CidadesController.Create
);

router.get(
  "/cidades",
  ensureAuthenticated,
  CidadesController.getAllValidation,
  CidadesController.GetAll
);

router.get(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.getByIdValidation,
  CidadesController.GetById
);

router.put(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.updateByIdValidation,
  CidadesController.UpdateById
);

router.delete(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.deleteByIdValidation,
  CidadesController.DeleteById
);

//rotas de pessoas
router.post(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.createValidation,
  PessoasController.Create
);

router.get(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.getAllValidation,
  PessoasController.GetAll
);

router.get(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.getByidValidation,
  PessoasController.GetById
);

router.put(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.updateByIdValidation,
  PessoasController.UpdateById
);

router.delete(
  "/pessoas/:id",
  ensureAuthenticated,
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
