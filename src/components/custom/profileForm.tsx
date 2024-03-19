"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { createIntRecord, getRecords } from "@/lib/airtable"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"

//import CompanyField from "./companyField"

interface Company {
  id: number
  fields: {
    Company: string
  }
}

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string(),
  comments: z.string()
})

const ProfileForm = () => {
  let [sessionEmail, setSessionEmail] = useState("");
  const [open, setOpen] = React.useState(false)
  const [companies, setCompanies] = React.useState<Company[] | null>([])
  //const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: sessionEmail
    }
  });

  useEffect(() => {
    const loadRecords = async () => {
        let data = await getRecords("2024 Hiring Fair - Companies");
        setCompanies(data);
    }
    loadRecords();
    if (form.formState.isSubmitSuccessful) {
      //form.resetField("email", { value: sessionEmail }) 
      form.resetField("company")
      form.resetField("comments") 
    }

  }, [])


  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createIntRecord("2024 Hiring Fair - Interactions", data);
    setSessionEmail(data.email);
    toast({
      title: "Form Submitted",
      description: `Your profile has been submitted to ${data.company}. Keep connecting!`,
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>Please use the same email that you used to sign up.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="my-5 w-full">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? companies?.find(
                              (company) => company.fields.Company === field.value
                            )?.fields.Company
                            : "Select a company"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search for a company..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No company found.</CommandEmpty>
                          <CommandGroup>
                            {companies && companies.map((company) => (
                              <CommandItem
                                value={company.fields.Company}
                                key={company.id}
                                onSelect={() => {
                                  form.setValue("company", company.fields.Company)
                                  setOpen(false)
                                }}
                              >
                                {company.fields.Company}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    company.fields.Company === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>Choose the company that you liked to make a connection</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-5">
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Write a Comment</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write a quick message here" {...field} />
                </FormControl>
                <FormDescription>Write a wonderful message to the hiring partner you just met!</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full bg-[#3F47FD]" type="submit">Submit</Button>
      </form>
    </Form>

  )
}

export default ProfileForm