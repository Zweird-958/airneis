import { Control, FieldValues, Path } from "react-hook-form"

import { FormField, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import useLocale from "@/hooks/useLocale"

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
}

const FirsNameField = <TFieldValues extends FieldValues>({
  control,
}: Props<TFieldValues>) => {
  const {
    translations: { forms },
  } = useLocale()

  return (
    <FormField
      control={control}
      name={"firstName" as Path<TFieldValues>}
      render={({ field }) => (
        <FormItem label={forms.firstName}>
          <Input {...field} />
        </FormItem>
      )}
    />
  )
}

export default FirsNameField
