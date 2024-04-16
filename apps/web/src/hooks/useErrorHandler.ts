import { TRPCClientError, TRPCClientErrorBase } from "@trpc/client"
import { DefaultErrorShape } from "@trpc/server"
import { toast } from "sonner"

import { useTranslation } from "@/i18n/client"

const useErrorHandler = () => {
  const { t } = useTranslation("forms")
  const onError = (error: TRPCClientErrorBase<DefaultErrorShape>) => {
    if (error instanceof TRPCClientError) {
      toast.error(error.message)

      return
    }

    toast.error(t("errors.unexpected"))
  }

  return {
    onError,
  }
}

export default useErrorHandler
