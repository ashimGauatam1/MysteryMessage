import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { APIResponse } from "@/Types/ApiResponse";

export async function SendEmailVerification(
  username: string,
  email: string,
  verificationcode: string
): Promise<APIResponse> {
  try {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Mystry message Verification code ',
        react: VerificationEmail({username,otp:verificationcode}),
      });
    return { success: true, message: "verification email send successfully" };
 
  } catch (error) {
    console.error("Error sending verification email", error);
    return { success: false, message: "failed to send verification email" };
  }
}
