import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";

export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,code}=await request.json()
       
        const decodedUsername=decodeURIComponent(username.username)  //optional
        console.log( decodedUsername)
       const user= await UserModel.findOne({username:decodedUsername})
       console.log(user)
        if(!user){
            return Response.json({
                success:false,
                message:"User doesnot exist"
            },{
                status:400
            })
        }else{
            const iscodevalid=user.verifyCode==code
            if(iscodevalid && user.CodeExpiry>new Date()){ //need to be consider
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


