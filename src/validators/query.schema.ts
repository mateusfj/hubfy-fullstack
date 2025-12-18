import z from "zod";

export const querySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  orderBy: z.enum(["createdAt", "title"]).optional(),
  orderDirection: z.enum(["asc", "desc"]).optional(),
});

export type QuerySchema = z.infer<typeof querySchema>;
