"use client"

import React, { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
        FormField,
        FormItem,
        FormControl,
        FormDescription,
        FormMessage,
        FormLabel
} from "@/components/ui/form"
import { getRecords } from "@/lib/airtable"

type Company = {
    id: number
    fields: {
        Name: string
    }
}

export default function CompanyField(form: any) {
    const [open, setOpen] = React.useState(false)
    const [companies, setCompanies] = React.useState<Company[]>([])
    const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(
        null
    )

    useEffect(() => {
        const loadRecords = async () => {
            let data = await getRecords("2024 Hiring Fair - Companies");
            setCompanies(data);
        }
        loadRecords();
    }, [])

  return (
    <FormField
        control={form.control}
        name="comments"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Select a Company</FormLabel>
            <FormControl>      
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        {selectedCompany ? <>{selectedCompany.fields.Name}</> : <>+ Select a Company</>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandInput placeholder="Search for company..." />
                        <CommandList>
                        <CommandEmpty>Company not found.</CommandEmpty>
                        <CommandGroup>
                            {companies.map((company) => (
                            <CommandItem
                                key={company.id}
                                value={company.fields.Name}
                                onSelect={(value) => {
                                setSelectedCompany(
                                    companies.find((company) => company.fields.Name === value) ||
                                    null
                                )
                                setOpen(false)
                                }}
                            >
                                {company.fields.Name}
                            </CommandItem>
                            ))}
                        </CommandGroup>
                        </CommandList>
                    </Command>
                    </PopoverContent>
                </Popover>
            </FormControl>
            <FormDescription>Enter in the company you just visited.</FormDescription>
            <FormMessage />
        </FormItem>
        )}
  />
  )
}
