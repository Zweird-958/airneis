import React from "react"
import { View } from "react-native"

interface FormContainerProps {
  title: string
  children: React.ReactNode
}

const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => (
  <View style={{ flex: 1 }}>
    <h1>{title}</h1>
    <View style={{ padding: 20 }}>{children}</View>
  </View>
)

export default FormContainer
