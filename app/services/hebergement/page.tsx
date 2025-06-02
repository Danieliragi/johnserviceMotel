import type { Metadata } from "next"
import HebergementClientPage from "./HebergementClientPage"

export const metadata: Metadata = {
  title: "Service d'Hébergement | John Services Motel",
  description:
    "Découvrez nos options d'hébergement confortables et élégantes pour tous les budgets et toutes les occasions.",
}

export default function HebergementPage() {
  return <HebergementClientPage />
}
