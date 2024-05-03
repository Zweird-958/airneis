import React from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { InputModeOptions, Text, TextInput, View } from "react-native"

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: string
  placeholder: string
  errors?: string
  type: InputModeOptions
  secureTextEntry: boolean
}

const FormField = <TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  errors,
  type,
  secureTextEntry,
}: Props<TFieldValues>) => (
  <View>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          className="border-2 border-gray-300 rounded-md p-2 my-2"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          inputMode={type}
          secureTextEntry={secureTextEntry}
        />
      )}
      name={name as Path<TFieldValues>}
    />
    {errors && <Text className="color-danger">{errors}</Text>}
  </View>
)

export default FormField
