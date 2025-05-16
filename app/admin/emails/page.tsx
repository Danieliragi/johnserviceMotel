import type { Metadata } from "next"
import { EmailLogs } from "@/components/admin/email-logs"

export const metadata: Metadata = {
  title: "Logs des emails | Administration John Services Motel",
  description: "Gestion et suivi des emails envoyés aux clients",
}

export default function EmailLogsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Logs des emails</h1>
      </div>

      <EmailLogs />
    </div>
  )
}
