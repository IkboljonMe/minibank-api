// Turns a route param like "12" into a number, or null if it is not a valid id.
export function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Postgres error code for a unique constraint violation.
export function isUniqueViolation(error: any): boolean {
  return error?.code === "23505" || error?.driverError?.code === "23505";
}
