import BaseError from "./baseError";

function logError(err: any) {
  console.error(err);
}

function logErrorMiddleware(err: any, req: any, res: any, next: any) {
  logError(err);
  next(err);
}

function returnError(err: any, req: any, res: any, next: any) {
  res.status(err.statusCode || 500).send({ response: err.name });
}

function isOperationalError(error: any) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

export { logError, logErrorMiddleware, returnError, isOperationalError };
