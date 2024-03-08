import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { TextInput } from "react-native"
import tw from "tailwind-react-native-classnames"

interface InputFieldProps {
  name: string
  placeholder: string
}

const InputField: React.FC<InputFieldProps> = ({ name, placeholder }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={tw`border border-gray-300 p-2 rounded-md`}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
        />
      )}
      name={name}
      defaultValue=""
    />
  )
}

export default InputField
