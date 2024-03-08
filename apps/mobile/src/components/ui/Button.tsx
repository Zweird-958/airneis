import React from "react"
import { Pressable, StyleSheet, Text } from "react-native"

interface ButtonProps {
  label: string
  onPress: () => void
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { label, onPress } = props
  const styles = StyleSheet.create({
    button: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    text: {
      color: "white",
    },
  })

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  )
}
