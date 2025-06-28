import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
// import { sendverificationEmail } from "@/helpers/sendVerificationEmails";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });

        // generating otp
        // const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserVerifiedByUsername) {
            // prevent registering if verified user with username exists
            return Response.json(
                {
                    success: false,
                    message: "User already Existed",
                },
                { status: 400 }
            );
        }

        const existingUserByEmail = await UserModel.findOne({ email });

        if (existingUserByEmail) {
            // if (existingUserByEmail.isVerified) {
            return Response.json(
                {
                    success: false,
                    message: "User already Registered with this email",
                },
                { status: 400 }
            );
            // } else {
            //     const hashedPassword = await bcrypt.hash(password, 10);
            //     existingUserByEmail.password = hashedPassword;
            //     // existingUserByEmail.verifyCode = verifyCode;
            //     // existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
            //     await existingUserByEmail.save();
            // }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            // const expiryDate = new Date();
            // expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                // verifyCode,
                isVerified: true,
                // verifyCodeExpiry: expiryDate,
                isAcceptingMessage: true,
                messages: [],
            });
            await newUser.save();
        }

        // send verification email
        // const emailResponse = await sendverificationEmail(
        //     email,
        //     username,
        //     verifyCode
        // );
        // if (!emailResponse.success) {
        //     return Response.json(
        //         {
        //             success: false,
        //             message: emailResponse.message,
        //         },
        //         { status: 400 }
        //     );
        // }

        return Response.json({
            success: true,
            message: "User registered Successfully Please Login",
        });

    } catch (error) {
        console.error("Error While registering User", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user",
            },
            {
                status: 500,
            }
        );
    }
}
