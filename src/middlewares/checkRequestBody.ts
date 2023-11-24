import { NextFunction, Request, Response } from "express";

function checkRequestBody(req: Request, res: Response, next: NextFunction) {
  const bodyProperties = req.body;

  // Check if any property in the request body is false
  const hasFalseValue = Object.values(bodyProperties).some(
    (value) => value === false
  );

  if (hasFalseValue) {
    return res.status(400).json({ error: "Invalid request body,bad request" });
  }

  // If all properties are valid, proceed to the next middleware or route handler
  next();
}

export default checkRequestBody;
