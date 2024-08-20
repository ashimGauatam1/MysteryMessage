import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { message } from "@/models/user";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 404,
        }
      );
    }
    if (!user.isacceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        {
          status: 400,
        }
      );
    }
    const newmessage = {
      content,
      createdAt: new Date(),
    };
    user.message.push(newmessage as message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: " message sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        success: false,
        message: "Failed to post message",
      },
      {
        status: 500,
      }
    );
  }
}
