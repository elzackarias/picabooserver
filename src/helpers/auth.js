import * as argon2 from "argon2";
import { isValid } from "../utils/test";
/*↑ Esta funcion valida si todo el form de login es correcto*/

export const login = (data) => {
  if (isValid(data)) {
    return {
      status: "Ok",
      msg: "Everything is okay",
    };
  } else {
    return {
      status: "Error",
      msg: "Bad Request",
    };
  }
};

export const VerifyPass = async (data) => {
  const passDB = data.db;
  const pass = data.pass;

  if (await argon2.verify(passDB, pass)) {
    return true;
  } else {
    return false;
  }
};
