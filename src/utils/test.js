export const isValid = (data) => {
  /*const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  */
  const validRegex = /^[\w-\.]+@alumno.buap.mx$/;
  if (validRegex.test(data.email) == false) {
    return false;
  } else {
    return true;
  }
};
