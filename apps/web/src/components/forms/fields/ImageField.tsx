import { ChangeEventHandler } from "react"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { useTranslation } from "@/i18n/client"

type Props = {
  handleOnChange: ChangeEventHandler<HTMLInputElement>
  fileName?: string
}

const ImageField = ({ handleOnChange, fileName }: Props) => {
  const { t } = useTranslation("forms")

  return (
    <Button asChild>
      <div className="flex">
        <Input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="image"
          onChange={handleOnChange}
          hidden
        />
        <label htmlFor="image" className="text-center w-full">
          {fileName ?? t("image.label")}
        </label>
      </div>
    </Button>
  )
}

export default ImageField
