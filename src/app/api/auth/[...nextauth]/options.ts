import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { text } from "stream/consumers";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials: {
                email: { label: "Email", type:"text" ,placeholder:"iqbal"},
                password: { label: "Password", type: "password" },
              },
              async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email: credentials.identifier.email},
                            {username: credentials.identifier.username}
                        ]
                    })

                    if(!user){
                        throw new Error("no user found with this email or username")
                    }
                    if(!user.isVerified){
                        throw new Error("please verify your account first")
                    }
                    
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error("Password is wrong")
                    }
                } catch (error:any) {
                    throw new Error(error)
                    
                }
              }
        })
    ],
    callbacks:{
        async jwt({ token, user, }) {
            if(user){
                token._id = user._id?.toString(),
                token.isVerified=user.isVerified,
                token.isAcceptingMessage= user.isAcceptingMessage,
                token.username= user.username
            }
            return token
          },
        async session({ session, token }) {
            if(token){
                session.user._id = token._id
                session.user.isVerified=token.isVerified
                session.user.isAcceptingMessage=token.isAcceptingMessage
                session.user.username=token.username
            }
            return session
        },
          
    },
    pages:{
        signIn: '/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}