import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import { SendEmailVerification } from "@/helpers/SendEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const ExistingVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (ExistingVerifiedUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }
    const verifyCode = Math.floor(1000000 + Math.random() * 90000).toString();

    const ExistingUserByEmail = await UserModel.findOne({ email });
    if (ExistingUserByEmail) {
      if (ExistingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "user already exists",
          },
          {
            status: 401,
          }
        );
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        ExistingUserByEmail.password = hashPassword;
        ExistingUserByEmail.verifyCode = verifyCode;
        ExistingUserByEmail.CodeExpiry = new Date(Date.now() + 3600000);
        await ExistingUserByEmail.save();
      }
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const ExpiryDate = new Date();
      ExpiryDate.setHours(ExpiryDate.getHours() + 1);

      const NewUser = new UserModel({
        username,
        email,
        hashPassword,
        verifyCode,
        CodeExpiry: ExpiryDate,
        isacceptingMessage: true,
        isVerified: false,
      });

      await NewUser.save();
    }

    // seding emails
    const emailverification = await SendEmailVerification(
      username,
      email,
      verifyCode
    );
    if (!emailverification.success) {
      return Response.json(
        {
          success: false,
          message: emailverification.message,
        },
        {
          status: 401,
        }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Email send successfully",
        },
        {
          status: 201,
        }
      );
    }
  } catch (error) {
    console.error("error while registring user", error);
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






