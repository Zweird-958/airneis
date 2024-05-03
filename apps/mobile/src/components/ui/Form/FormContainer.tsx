import React from "react"
import { Text, View } from "react-native"

interface FormContainerProps {
  title: string
  children: React.ReactNode
}

const FormContainer = ({ title, children }: FormContainerProps) => (
  <View className=" flex-1">
    <Text className="text-center p-4 text-2xl">{title}</Text>
    <View className="px-4">{children}</View>
  </View>
)

export default FormContainer
