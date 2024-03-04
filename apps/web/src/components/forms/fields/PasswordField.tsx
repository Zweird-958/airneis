import { Control, FieldValues, Path } from "react-hook-form"

import { FormField, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import useLocale from "@/hooks/useLocale"

type Props<T extends FieldValues> = {
  control: Control<T>
}

const PasswordField = <T extends FieldValues>({ control }: Props<T>) => {
  const {
    translations: { forms },
  } = useLocale()

  return (
    <FormField
      control={control}
      name={"password" as Path<T>}
      render={({ field }) => (
        <FormItem label={forms.password}>
          <Input {...field} type="password" />
        </FormItem>
      )}
    />
  )
}

export default PasswordField
