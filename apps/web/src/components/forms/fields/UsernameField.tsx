import { Control, FieldValues, Path } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import Input from "@/components/ui/Input"
import useLocale from "@/hooks/useLocale"

type Props<T extends FieldValues> = {
  control: Control<T>
}

const UsernameField = <T extends FieldValues>({ control }: Props<T>) => {
  const {
    translations: { forms },
  } = useLocale()

  return (
    <FormField
      control={control}
      name={"username" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{forms.username}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Test description.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default UsernameField
