import { Control, FieldValues, Path } from "react-hook-form"

import { FormField, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import useTranslations from "@/utils/i18n/client"

type Props<T extends FieldValues> = {
  control: Control<T>
}

const UsernameField = <T extends FieldValues>({ control }: Props<T>) => {
  const { forms } = useTranslations()

  return (
    <FormField
      control={control}
      name={"username" as Path<T>}
      render={({ field }) => (
        <FormItem label={forms.username} description="Test description.">
          <Input {...field} />
        </FormItem>
      )}
    />
  )
}

export default UsernameField
