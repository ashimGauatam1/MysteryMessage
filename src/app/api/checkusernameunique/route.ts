import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signupSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
  await dbConnect();
  try {
    const {searchParams}=new URL(request.url)
    const queryparam={
        username:searchParams.get('username')
    }
    //validate with zord
    const result=UsernameQuerySchema.safeParse(queryparam)
    console.log(result)   // remove 
    if (!result.success) {
        const usernameError=result.error.format().username?._errors || []
        return Response.json({
            success:false,
            message:"invalid query parameter"
        },{
            status:400
        })
    }

    const {username}=result.data
    const ExistingVerifiedUsername=await UserModel.findOne({
        username,
        isVerified:true
    })
    if (ExistingVerifiedUsername) {
        return Response.json({
            success:false,
            message:"Username is already taken"
        },{
            status:400
        })
    }
    else{
        return Response.json({
            success:true,
            message:"username is available"
        },{
            status:200
        })
    }
  } catch (error) {
    console.error("checking username",error)
    return Response.json({
        success:false,
        message:"error while checking username"
    },{
        status:500
    })
  }
}