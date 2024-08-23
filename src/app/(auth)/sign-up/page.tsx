"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SignupSchema } from "@/schemas/signupSchema";
import axios from "axios";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
const page = () => {
  const [username, Setusername] = useState("");
  const [usernameMessage, SetusernameMessage] = useState("");
  const [ischeckingUsername, SetischeckingUsername] = useState(false);
  const [isSubmitting, SetisSubmitting] = useState(false);
  const debounced = useDebounceCallback(Setusername, 300);
  const { toast } = useToast();
  const router = useRouter();

  // zod
  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });
  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        SetischeckingUsername(true);
        SetusernameMessage("");
        try {
          const response = await axios.get(
            `/api/checkusernameunique?username=${username}`
          );
          let message = response.data.message
          SetusernameMessage(message)
        } catch (error) {
          console.log("Eror while checking",error)
        }
        finally{
          SetischeckingUsername(false)
        }
      }
    };
    checkUsername()
  }, [username]);


  const onSubmit=async(data:z.infer<typeof SignupSchema>) =>{
    SetisSubmitting(true)
    try {
      const response=await axios.post('/api/signup',data)
      toast({
        title:"Success",
        description:response.data.message,
        
      })
      router.replace(`/verify/${username}`)
      SetisSubmitting(false)
    } catch (error) {
      console.log("Error while submitting",error)
      toast({
        title:"Error",
        description:"User already exists",
        variant:"success" 
      })
      SetisSubmitting(false)
    }
  }
  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
      <div className="text-center">
        <h1 className="font-bold text-4xl lg:text-5xl">Join Mystry Message</h1>
        <p className="mb-4">Sign up to start advanture</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field}
                onChange={(e)=>{
                  field.onChange(e)
                  debounced(e.target.value)}}
                />
              </FormControl>
                {<>
                  
                  {usernameMessage && <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p className="text-green-500 font-bold">{usernameMessage}
                    </p></div>}
                  </>
                }<p>
                  
                </p>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your Email" {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your Password" {...field}
                
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {
            isSubmitting ?(
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
              </>
            ):
            ("Signup")
          }

        </Button>
      </form>
    </Form>
    <h6 className='mt-5'>
          Already have your account?<a href='/sign-in' className='ml-2 text-purple-500 underline'>Register</a>
    </h6>
    </div>
  </div>
);
};

export default page;
