import { z } from "zod";

export const payloadSchema = z.object({
  prospectName: z.string().min(2, "Prospect name is too short").max(100),
  company: z.string().min(2, "Company name is too short").max(100),
  context: z.string().min(10, "Context must be at least 10 characters").max(5000),
});

export function validatePayload(body: unknown) {
  return payloadSchema.safeParse(body);
}
