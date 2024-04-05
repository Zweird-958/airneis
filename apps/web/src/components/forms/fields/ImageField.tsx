import { Control, FieldValues, Path } from "react-hook-form"

import { FormField, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import { useTranslation } from "@/i18n/client"

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
}

const ImageField = <TFieldValues extends FieldValues>({
  control,
}: Props<TFieldValues>) => {
  const { t } = useTranslation("forms")

  return (
    <FormField
      control={control}
      name={"imageUrl" as Path<TFieldValues>}
      render={({ field }) => (
        <FormItem label={t("image.label")} description={t("image.description")}>
          <Input {...field} />
        </FormItem>
      )}
    />
  )
}

export default ImageField
