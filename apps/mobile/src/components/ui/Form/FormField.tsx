import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Text, TextInput, View } from "react-native"

interface InputFieldProps {
  name: string
  placeholder: string
  errors: string | undefined
}

export const FormField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  errors,
}) => {
  const { control } = useFormContext()

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border-2 border-gray-300 rounded-md p-2"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
          />
        )}
        name={name}
        defaultValue=""
      />
      {errors && <Text className="text-red-500">{errors}</Text>}
    </View>
  )
}
