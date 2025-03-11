import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request:Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user : User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"You need to be logged in to accept a message"
        })
    }
    const userId = user._id;
    const {acceptMessage} = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessages:acceptMessage},
            {new:true}
        )
        if(!updatedUser){
            return Response.json({
                success:false,
                message:"User not found"
            })
        }else{
            return Response.json({
                success:true,
                message:"User status updated successfully"
            })
        }

    } catch (error) {
        console.log("failed to update user status to accept msg",error)
        return Response.json({
            success:false,
            message:"Failed to update user status to accept msg"
        })
    }

}

export async function GET(request:Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user : User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"You need to be logged in to accept a message"
        })
    }
    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId)
    if(!foundUser){
        return Response.json({
            success:false,
            message:"User not found"
        })
    }else{
        return Response.json({
            success:true,
            message:"User found",
            data:{
                isAcceptingMessages:foundUser.isAcceptingMessage
            }
        })
    }
    } catch (error) {
        console.log("failed to get user status to accept msg",error)
        return Response.json({
            success:false,
            message:"error in getting msg status"
        })      
    }
}