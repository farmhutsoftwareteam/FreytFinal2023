import { Separator } from "@/registry/new-york/ui/separator"
import { OrganizationForm } from "@/app/dashboard/forms/account/account-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Oraganizational Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <OrganizationForm />
    </div>
  )
}
