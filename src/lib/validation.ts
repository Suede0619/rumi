import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  message: z.string().min(10, {
    message: "Please provide a message (at least 10 characters).",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
