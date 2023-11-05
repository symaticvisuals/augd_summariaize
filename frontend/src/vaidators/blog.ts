import { z } from "zod";

export const BlogValidator = z.object({
  title: z
    .string()
    .min(3, "Title must be longer than 3 characters")
    .max(100, "Title must be shorter than 100 characters"),
  content: z.any(),
});

export type BlogCreationRequest = z.infer<typeof BlogValidator>;
