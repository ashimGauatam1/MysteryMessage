import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 400,
      }
    );
  }
  const userID = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      { $match: { id: userID } },
      { $unwind: "$message" },
      { $sort: { "message.Date": -1 } },
      { $group: { _id: "$_id", message: { $push: "$message" } } },
    ]);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: user[0].message,
      },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.log(error)
    return Response.json(
        {
          success: false,
          message: "Failed to get user message",
        },
        {
          status: 500,
        }
      );
  }
}


