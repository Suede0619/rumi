import { z } from "zod";

export const betaSignupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneType: z.enum(["iphone", "android"], {
    message: "Please select your device.",
  }),
});

export type BetaSignupData = z.infer<typeof betaSignupSchema>;
