import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({
      success: false,
      message: "You need to be logged in to accept a message",
    }, { status: 401 });
  }

  if (!user._id || !mongoose.Types.ObjectId.isValid(user._id)) {
    return Response.json({
      success: false,
      message: "Invalid or missing user ID",
    }, { status: 400 });
  }

  const userId = new mongoose.Types.ObjectId(user._id);
  const { acceptMessage } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessage }, // ✅ Updated property name
      { new: true }
    );

    if (!updatedUser) {
      return Response.json({
        success: false,
        message: "User not found",
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: "User status updated successfully",
    }, { status: 200 });

  } catch (error) {
    console.error("Failed to update user status:", error);
    return Response.json({
      success: false,
      message: "Failed to update user status",
    }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({
      success: false,
      message: "You need to be logged in to fetch messages",
    }, { status: 401 });
  }

  if (!user._id || !mongoose.Types.ObjectId.isValid(user._id)) {
    return Response.json({
      success: false,
      message: "Invalid or missing user ID",
    }, { status: 400 });
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const foundUser = await UserModel.findById(userId).select("isAcceptingMessages messages");

    if (!foundUser) {
      return Response.json({
        success: false,
        message: "User not found",
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: "User found",
      data: {
        isAcceptingMessages: foundUser.isAcceptingMessages, // ✅ Updated property name
        messages: foundUser.messages || [],
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch user messages:", error);
    return Response.json({
      success: false,
      message: "Error in fetching messages",
    }, { status: 500 });
  }
}
