import { Control, FieldValues, Path } from "react-hook-form"

import { FormField, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import useLocale from "@/hooks/useLocale"

type Props<T extends FieldValues> = {
  control: Control<T>
}

const LastNameField = <T extends FieldValues>({ control }: Props<T>) => {
  const {
    translations: { forms },
  } = useLocale()

  return (
    <FormField
      control={control}
      name={"lastName" as Path<T>}
      render={({ field }) => (
        <FormItem label={forms.lastName}>
          <Input {...field} />
        </FormItem>
      )}
    />
  )
}

export default LastNameField
