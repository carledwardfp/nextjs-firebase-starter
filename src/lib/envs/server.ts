import { z } from "zod";

const serverSchema = z.object({
  // Example:
  // FIREBASE_SECRET: z.string().trim().min(1),
});

export const serverEnvs = serverSchema.parse({
  // FIREBASE_SECRET: process.env.FIREBASE_SECRET,
});
