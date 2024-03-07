import { Control, FieldValues, Path } from "react-hook-form"

import { FormField, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import useTranslations from "@/utils/i18n/client"

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
}

const EmailField = <TFieldValues extends FieldValues>({
  control,
}: Props<TFieldValues>) => {
  const { forms } = useTranslations()

  return (
    <FormField
      control={control}
      name={"email" as Path<TFieldValues>}
      render={({ field }) => (
        <FormItem label={forms.email}>
          <Input {...field} />
        </FormItem>
      )}
    />
  )
}

export default EmailField
