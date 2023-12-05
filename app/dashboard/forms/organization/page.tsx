"use client"

import { Separator } from "@/registry/new-york/ui/separator"
import { OrganizationForm } from "./account-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Oraganizational Information</h3>
       
      </div>
      <Separator />
      <OrganizationForm />
    </div>
  )
}
