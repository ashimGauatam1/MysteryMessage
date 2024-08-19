import { message } from "@/models/user"

export interface APIResponse {
    success:boolean,
    message:string,
    isacceptingmessage?:boolean,
    messages?:Array<message>
}
