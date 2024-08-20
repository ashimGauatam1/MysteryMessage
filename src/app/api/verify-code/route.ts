import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { Grandiflora_One } from "next/font/google";

export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,code}=await request.json()
        const decodedUsername=decodeURIComponent(username)  //optional
       const user= await UserModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json({
                success:false,
                message:"User doesnot exist"
            },{
                status:400
            })
        }else{
            const iscodevalid=user.verifyCode==code
            const iscodenotexperied=new Date(user.CodeExpiry)>new Date()
            if(iscodevalid && iscodenotexperied){
                user.isVerified=true,
                await user.save()
                return Response.json({
                    success:true,
                    message:"Account verified successfully"
                },{
                    status:200
                })
            }
            else if(!iscodevalid){
                return Response.json({
                    success:false,
                    message:"Incorrect Verification code"
                },{
                    status:400
                })
            }else{
                return Response.json({
                    success:false,
                    message:"Your code has expired"
                },{
                    status:400
                })
            }
        }
    } catch (error) {
        console.error("checking verification code",error)
    return Response.json({
        success:false,
        message:"error while checking code"
    },{
        status:500
    })
    }
}


