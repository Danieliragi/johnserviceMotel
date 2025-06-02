import type { Metadata } from "next"
import FacturesTable from "@/components/admin/factures-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

// Mark this route as dynamic to prevent static rendering
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Gestion des Factures | John Services Motel",
  description: "Gérez les factures du motel",
}

export default function FacturesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Factures</h1>
          <p className="text-gray-500">Gérez les factures des clients</p>
        </div>
        <Link href="/admin/factures/nouvelle">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle facture
          </Button>
        </Link>
      </div>

      <FacturesTable />
    </div>
  )
}
