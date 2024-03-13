"use client"

import React, { useEffect } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
        FormControl,
} from "@/components/ui/form"
import { getRecords } from "@/lib/airtable"

type Company = {
    id: number
    fields: {
        Name: string
    }
}

export default function CompanyField(form: any, field: any) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [companies, setCompanies] = React.useState<Company[]>([])
    
    console.log(field)
    useEffect(() => {
        const loadRecords = async () => {
            let data = await getRecords("2024 Hiring Fair - Companies");
            setCompanies(data);
            console.log(data)
            console.log(field.value)
        }
        loadRecords();
    }, [])
   
    return (
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? companies?.find(
                  (company) => company.fields.Name === field.value
                )?.fields.Name
                : "Select language"}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search framework..."
              className="h-9"
            />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {companies && companies.map((company) => (
                  <CommandItem
                    value={company.fields.Name}
                    key={company.id}
                    className={cn(
                      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-base outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50"
                    )}
                    onSelect={() => {
                      form.form.setValue("company", company.fields.Name)
                    }}
                  >
                    {company.fields.Name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        company.fields.Name === field.value
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
    )
  }



