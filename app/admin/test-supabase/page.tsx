import SupabaseTest from "@/components/supabase-test"

export default function TestSupabasePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Test de l'intégration Supabase</h1>
      <SupabaseTest />
    </div>
  )
}
