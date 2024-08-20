import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth'{
    interface User{
        _id?:string;
        isVerified?:boolean;
        isacceptingmesssage?:boolean;
        username:string
    }
    interface Session{
        user:{
            _id?:string;
            isVerified?:boolean;
            isacceptingmesssage?:boolean | undefined;
            username:string,
            
        }& DefaultSession['user']
    }
}
 
declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string;
        isVerified?:boolean;
        isacceptingmesssage?:boolean;
        username:string
    }
}
