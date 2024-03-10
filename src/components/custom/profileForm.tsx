"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import CompanyField from "./companyField"

interface Record {
  id: string;
  fields: {
    "Name": string;
  };
}

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address"}),
  companies: z.string(),
  comments: z.string()
})

const ProfileForm = () => {
  let [sessionEmail, setSessionEmail] = useState("");

  useEffect(() => {
    
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //mode: "onChange"
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("The form has been submitted")
    console.log(data);
    //setSessionEmail(data.email);
  };

  // const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}> 
          <FormField
            control={form.control}
            name="email"
            defaultValue={sessionEmail}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com...." {...field} />
                </FormControl>
                <FormDescription>Please use the same email that you used to sign up.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="my-5 w-full">
           <CompanyField form={form} />
          </div> */}

          <div className="my-5">  
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write a Comment</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a quick message here...." {...field} />
                  </FormControl>
                  <FormDescription>Write a wonderful message to the hiring partner you just met!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-5">
            <Button type="submit">Submit</Button>
          </div>
      </form> 
    </Form>
  )
}

export default ProfileForm