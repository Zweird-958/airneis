import { Control, FieldValues, Path } from "react-hook-form"

import { FormField, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import useTranslations from "@/utils/i18n/client"

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
}

const PasswordField = <TFieldValues extends FieldValues>({
  control,
}: Props<TFieldValues>) => {
  const { forms } = useTranslations()

  return (
    <FormField
      control={control}
      name={"password" as Path<TFieldValues>}
      render={({ field }) => (
        <FormItem label={forms.password}>
          <Input {...field} type="password" />
        </FormItem>
      )}
    />
  )
}

export default PasswordField
