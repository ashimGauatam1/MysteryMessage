import { z } from "zod";

export const VerifyCodeSchema = z.object({
  verifyCode: z.string().length(6, { message: "code must be 6 digits" }),
});
