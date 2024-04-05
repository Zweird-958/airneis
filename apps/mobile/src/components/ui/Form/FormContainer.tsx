import React from "react"
import { Text, View } from "react-native"

interface FormContainerProps {
  title: string
  children: React.ReactNode
}

const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => (
  <View style={{ flex: 1 }}>
    <Text style={{ fontSize: 24, textAlign: "center", padding: 20 }}>
      {title}
    </Text>
    <View style={{ padding: 20 }}>{children}</View>
  </View>
)

export default FormContainer
