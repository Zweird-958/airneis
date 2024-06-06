import { Control, FieldValues, Path } from "react-hook-form"

import { FormField, FormItem } from "@/components/ui/Form"
import Input from "@/components/ui/Input"

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
}

const QuantityField = <TFieldValues extends FieldValues>({
  control,
}: Props<TFieldValues>) => (
  <FormField
    control={control}
    name={"quantity" as Path<TFieldValues>}
    render={({ field }) => (
      <FormItem hideError>
        <Input {...field} type="number" />
      </FormItem>
    )}
  />
)

export default QuantityField
