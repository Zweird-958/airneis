import React from "react"
import { Text, View } from "react-native"

interface FormContainerProps {
  title: string
  children: React.ReactNode
}

const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => (
  <View className=" flex-1">
    <Text className="text-center p-4 size-24">{title}</Text>
    <View className="p-4">{children}</View>
  </View>
)

export default FormContainer
