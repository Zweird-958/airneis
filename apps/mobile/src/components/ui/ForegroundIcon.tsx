import { LucideProps } from "lucide-react-native"
import React, { ForwardRefExoticComponent } from "react"

type Props = {
  as: ForwardRefExoticComponent<LucideProps>
} & LucideProps

const ForegroundIcon = ({ as: Component, ...props }: Props) => (
  <Component color="hsl(0 0% 0%)" {...props} />
)

export default ForegroundIcon
