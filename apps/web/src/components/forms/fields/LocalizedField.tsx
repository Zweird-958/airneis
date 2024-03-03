import config from "packages/config"
import { Control, FieldValues, Path } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  RawFormItem,
} from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import Label from "@/components/ui/Label"

type Props<TFieldValues extends FieldValues> = {
  name: string
  label: string
  control: Control<TFieldValues>
}

const LocalizedField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
}: Props<TFieldValues>) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {config.languageKeys.map((lang) => (
      <FormField
        key={lang}
        control={control}
        name={`${name}.${lang}` as Path<TFieldValues>}
        render={({ field }) => (
          <RawFormItem>
            <div className="flex items-center">
              <FormLabel className="text-center min-w-16">
                {lang.toUpperCase()}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </div>
            <div className="flex items-center mt-1">
              <div className="min-w-16" />
              <FormMessage />
            </div>
          </RawFormItem>
        )}
      />
    ))}
  </div>
)

export default LocalizedField
