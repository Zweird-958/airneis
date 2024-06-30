import React from "react"
import { Pressable, Text } from "react-native"

interface ButtonProps {
  label: string
  onPress: () => void
}

const Button = ({ label, onPress }: ButtonProps) => (
  <Pressable onPress={onPress} className="bg-primary p-4 my-2 rounded-md">
    <Text className="text-primary-foreground text-center">{label}</Text>
  </Pressable>
)

export default Button
