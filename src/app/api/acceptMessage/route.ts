import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { User } from "next-auth";

export async function POST(request: Request) {
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
  const userID = user._id;
  const { acceptMessage } = await request.json();
  try {
    const UpdatedUser = await UserModel.findByIdAndUpdate(
      userID,
      { isacceptingMessage: acceptMessage },
      { new: true }
    );
    if (!UpdatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user ",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Sucessfully updated user",
          UpdatedUser,
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Failed to update user status", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user status",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();
  try {
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
    const userID = user._id;
    const userById = await UserModel.findById(userID);
    if (!userById) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 401,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          isacceptingMessage: userById.isacceptingMessage,
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
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
