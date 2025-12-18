import { z } from "zod";

export function parseQueryParams<T>(req: Request, schema: z.ZodSchema<T>): T {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());
  return schema.parse(params);
}
