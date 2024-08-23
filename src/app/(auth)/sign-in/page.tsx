'use client'

import { toast } from '@/components/ui/use-toast'
import { SignInSchema } from '@/schemas/signinSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
 const page = () => {
  const form=useForm({
    resolver:zodResolver(SignInSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })
  const router=useRouter()
  const [isSubmitting,SetisSubmitting]=useState(false)
  const onSubmit=async(data:z.infer<typeof SignInSchema>)=>{
        SetisSubmitting(true)
        try {
          const response=await signIn('credentials',{
            redirect:false,
            email:data.email,
            password:data.password
          })
          if(response?.error){
            SetisSubmitting(false)
            toast({
              title:"Error",
              description:response.error,
              variant:"destructive"
            })
          }
          if(response?.url){
            toast({
              title:"Success",
              description:"Login Successful",
              variant:"success"
            })
            router.replace('/')
          }
        } catch (error) {
          SetisSubmitting(false)
          console.log(error)
          toast({
            title:"Error while sigin in",
            description:"Please check your credentials",
            variant:"destructive"
          })
        }
  }
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">

    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold  text-purple-700 text-center">Mystery Message Login</h2>
        <h5 className=" italic text-gray-700 text-center mb-6">Please use your valid email and password</h5>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder="email" {...field} />
              </FormControl>
              <FormDescription className='text-red-400 font-semibold'>
              Enter your verified eamil address.
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
                <Input type='password' placeholder="password" {...field} />
              </FormControl>
              <FormDescription className='text-red-400 font-semibold'>
                Enter valid password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
{!isSubmitting?
        <Button type="submit" className='hover:bg-green-700'>Submit</Button>
        :
        <>
        <Button  className='bg-gray-500'><Loader2 className='mr-2 animate-spin'/>Please Wait</Button>
        </>
        }
      </form>
    </Form>
    <h6 className='mt-5'>
          New at Mystery Message ?<a href='/sign-up' className='ml-2 text-purple-500 underline font-bold'>Register</a>
    </h6>
    </div>
    </div>
  )
}

export default page