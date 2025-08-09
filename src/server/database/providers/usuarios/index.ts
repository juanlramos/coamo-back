import * as Create from "./Create";
import * as GetByEmail from "./GetByEmail";
import * as UpdateById from "./UpdateById";

export const UsuariosProvider = {
  ...Create,
  ...GetByEmail,
  ...UpdateById,
};
