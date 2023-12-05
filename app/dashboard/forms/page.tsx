"use client"
import { Separator } from "@/registry/new-york/ui/separator"
import UserForm from "./profile-form"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      
      <Separator />
      <UserForm />
    </div>
  )
}
