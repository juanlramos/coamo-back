import * as SignIn from "./SignIn";
import * as SignUp from "./SignUp";
import * as ConfirmEmail from "./ConfirmEmail";

export const UsuariosController = {
  ...SignIn,
  ...SignUp,
  ...ConfirmEmail,
};
