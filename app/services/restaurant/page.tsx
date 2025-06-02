import type { Metadata } from "next"
import RestaurantClientPage from "./RestaurantClientPage"

export const metadata: Metadata = {
  title: "Restaurant | John Services Motel",
  description: "Découvrez notre restaurant proposant une cuisine délicieuse dans un cadre élégant et confortable.",
}

export default function RestaurantPage() {
  return <RestaurantClientPage />
}
