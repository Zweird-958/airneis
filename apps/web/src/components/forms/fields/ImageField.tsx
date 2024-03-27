import { ChangeEventHandler } from "react"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

type Props = {
  handleOnChange: ChangeEventHandler<HTMLInputElement>
}

const ImageField = ({ handleOnChange }: Props) => (
  <Button asChild>
    <Input
      type="file"
      accept="image/png, image/jpeg, image/jpg"
      onChange={handleOnChange}
    />
  </Button>
)

export default ImageField
