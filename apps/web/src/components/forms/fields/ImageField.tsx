import { Control, FieldValues, Path } from "react-hook-form"

import { FormField, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import useLocale from "@/hooks/useLocale"

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
}

const ImageField = <TFieldValues extends FieldValues>({
  control,
}: Props<TFieldValues>) => {
  const {
    translations: { forms },
  } = useLocale()

  return (
    <FormField
      control={control}
      name={"imageUrl" as Path<TFieldValues>}
      render={({ field }) => (
        <FormItem
          label={forms.image.label}
          description={forms.image.description}
        >
          <Input {...field} />
        </FormItem>
      )}
    />
  )
}

export default ImageField
