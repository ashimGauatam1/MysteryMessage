"use client";

import { toast } from "@/components/ui/use-toast";
import { VerifyCodeSchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader} from "lucide-react";

const page = () => {
  const param = useParams();
  const router = useRouter();
  const [isSubmitting,SetisSubmitting]=useState(false)
  const form = useForm({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      verifyCode: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof VerifyCodeSchema>) => {
    SetisSubmitting(true)
    try {
      const response = await axios.post("/api/verify-code", {
        username: param,
        code: data.verifyCode,
      });
      toast({
        title: "sucess",
        description: response.data.message,
        variant:"success" 
      });
      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        variant: "destructive",
        description: "OTP verification failed",
      });
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
          <div className="text-center">
            <h1 className="font-bold text-4xl lg:text-5xl">
              OTP Verification page
            </h1>
            <p className="mb-4">Enter the otp sent in your gmail</p>
          </div>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="verifyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter otp here" {...field} />
              </FormControl>
              <FormDescription>
                Enter valid otp code.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
{ !isSubmitting?
        <Button type="submit" className="hover:bg-green-700">Submit</Button>
:
<><Button type="submit" className="hover:bg-green-700">Submit</Button>
<div className="flex flex-row text-slate-500">
<Loader className="animate-spin"/>
Loading......
</div>
</>
  }
      </form>
    </Form>
        </div>
      
      </div>
    </div>
  );
};

export default page;
