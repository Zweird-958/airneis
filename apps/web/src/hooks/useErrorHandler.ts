import { TRPCClientError, TRPCClientErrorBase } from "@trpc/client"
import { DefaultErrorShape } from "@trpc/server"
import { toast } from "sonner"

import useLocale from "@/hooks/useLocale"

const useErrorHandler = () => {
  const {
    translations: { forms },
  } = useLocale()
  const onError = (error: TRPCClientErrorBase<DefaultErrorShape>) => {
    if (error instanceof TRPCClientError) {
      toast.error(error.message)

      return
    }

    toast.error(forms.unexpectedError)
  }

  return {
    onError,
  }
}

export default useErrorHandler
