import type { LightbulbIcon as LucideProps } from "lucide-react"

export const Refrigerator = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M10 6 L10 18" />
      <path d="M4 10 L20 10" />
    </svg>
  )
}

export default Refrigerator
