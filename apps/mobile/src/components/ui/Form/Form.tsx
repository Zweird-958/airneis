import React from "react"
import { View } from "react-native"

interface FormContainerProps {
  children: React.ReactNode
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => (
  <View style={{ flex: 1 }}>
    <View style={{ padding: 20 }}>{children}</View>
  </View>
)

export default FormContainer
