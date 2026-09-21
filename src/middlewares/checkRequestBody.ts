import { NextFunction, Request, Response } from "express";

// Returns a middleware that checks that every field in `fields`
// is a non-empty string in the request body.
function checkRequestBody(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body || {};
    const missing = fields.filter(
      (field) =>
        typeof body[field] !== "string" || body[field].trim().length === 0
    );

    if (missing.length > 0) {
      return res
        .status(400)
        .json({ error: `Missing or invalid fields: ${missing.join(", ")}` });
    }

    return next();
  };
}

export default checkRequestBody;
