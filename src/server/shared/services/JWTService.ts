import * as jwt from "jsonwebtoken";

//o JWT ele gera um token unico pra cada usuario, por isso precisamos do uid
interface IJWTData {
  uid: number;
}

export const sign = (data: IJWTData): string | 'JWT_SECRET_NOT_FOUND' => {
  if (!process.env.JWT_SECRET) {
    return "JWT_SECRET_NOT_FOUND";
  }

  /**
   * para gerar um jwt é necessario um objeto com dados (com o uid)
   * uma chave(adicioanr nas variaveis de ambiente)
   * e as opções de geração, ex: o token dura por 24h
   */
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const verify = (
  token: string
): IJWTData | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" => {
  if (!process.env.JWT_SECRET) {
    return "JWT_SECRET_NOT_FOUND";
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "string") {
      return "INVALID_TOKEN";
    } else {
      return decoded as IJWTData;
    }
  } catch (error) {
    return "INVALID_TOKEN";
  }
};

export const JWTService = {
  sign,
  verify,
};
