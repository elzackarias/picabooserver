export const isValid = (data) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
  if (
    data.email === undefined ||
    data.password === undefined ||
    data.email == "" ||
    data.password == "" ||
    validRegex.test(data.email) == false
  ) {
    return false;
  } else {
    return true;
  }
};
