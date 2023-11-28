"use client"

import React from "react"
import { useEffect, useState } from "react"

import { useProfile } from "@/contexts/profile"
import {
  CaretSortIcon,
  
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"
import { Button } from "@/registry/new-york/ui/button"
import {
  Command,
 
  CommandItem,
  CommandList,
 
} from "@/registry/new-york/ui/command"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"


const userProfile = {
  first_name: "John",
  last_name: "Doe",
  organization: "Acme Inc."
};



type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const profile = useProfile();
  
  
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="View profile and organization"
          className="w-[200px] justify-between"
        >
          {profile ? (
            <span>{`${profile.first_name} `}</span>
          ) : (
            <span>Loading...</span>
          )}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            {/* Display the organization name */}
            <CommandItem className="text-sm">
              Organization: {userProfile.organization}
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

