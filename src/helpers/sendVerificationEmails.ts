import resend from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendverificationEmail(
    email:string,
    username:string,
    verifyCode:string

):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'iqbal@resend.dev',
            to: email,
            subject: 'Verification Code from Iqbal projects',
            react: VerificationEmail({username,otp:verifyCode}),
          });


        return{
            success:true,
            message:"send verification email successfully"
        }

    } catch (emailError) {
        console.error("Error in Sending Verification Email",emailError)
        return{
            success:false,
            message:"failes to send verification email"
        }
    }
}
