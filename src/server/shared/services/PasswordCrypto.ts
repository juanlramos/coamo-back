import { compare, genSalt, hash } from "bcrypt";

//tamanho do salt
const SALT_RANDOMS = 8;

//criptografa uma sennha recebida
const hashPassword = async (password: string) => {
  //SALT para deixar a senha mais dificil (quanto maior o numero for, mais dificil é, mas é mais pesado verificar)
  const saltGenerated = await genSalt(SALT_RANDOMS);

  /**
   * Aqui é a função que criptografa
   * parametro 1: senha recebida
   * parametro 2: uma string para deixar mais dificil a senha criptografada, para isso é necessario o SALT
   */
  return await hash(password, saltGenerated);
};

//verifica a senha, se a que o usuario digitou é igual ao que ta no banco de dados
const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  verifyPassword,
  hashPassword,
};
