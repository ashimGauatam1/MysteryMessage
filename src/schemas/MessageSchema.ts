import { z } from "zod";

export const MessageSchema = z.object({
    content: z.string()
            .min(10,{message:"message must be minimun 10 characters"})
            .max(100,{message:"message must be longer than characters"})
});
