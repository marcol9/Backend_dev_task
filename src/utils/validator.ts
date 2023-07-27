import Api400Error from "../errorHandling/api400Error";
import validator from "validator";

//checks if number is numeric (supports decimal)
function valNumber(number: any) {
  return validator.isNumeric(number + ""); //adding + "" because function accepts strings
}
//there can be a lot of different symbols in company names, so just checking if it is null
function valString(string: any) {
  if (string == null) {
    return false;
  } else {
    return true;
  }
}
//validates inputs object
export function validateMovieBody(movieBody: any) {
  const schema = {
    name: (value: any) => valString(value),
    rating: (value: any) => valNumber(value),
    country_id: (value: any) => valNumber(value),
    genre_id: (value: any) => valNumber(value),
  };

  const validate = (object: any, schema: any) =>
    Object.keys(schema)
      .filter((key) => !schema[key](object[key]))
      .map((key) => {
        throw new Api400Error(`${key} field is invalid.`);
      });

  validate(movieBody, schema);
}

export function validateRequestParameter(number: any) {
  if (!validator.isNumeric(number + "")) {
    throw new Api400Error(`Url parameter is invalid. Expecting int`);
  }
}
