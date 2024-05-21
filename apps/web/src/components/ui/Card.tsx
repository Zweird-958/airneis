import { ReactNode } from "react"

import { cn } from "@/utils/cn"

type Props = {
  className?: string
  children: ReactNode
}

const Card = ({ children, className }: Props) => (
  <div className={cn("bg-card p-4 rounded-default", className)}>{children}</div>
)

export default Card
