"use client"

import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"
import { PageProps } from "@/types/common"

type Props = PageProps & {
  params: {
    jwt: string
  }
}

const DisplayMessage = ({
  message,
  children,
}: {
  message: string
  children?: ReactNode
}) => (
  <div className="bg-neutral-50 p-3 rounded-lg shadow-lg w-fit">
    <p>{message}</p>
    {children}
  </div>
)
const Page = ({ params: { jwt } }: Props) => {
  const router = useRouter()
  const [triggerClock, setTriggerClock] = useState(false)
  const [count, setCount] = useState(5)
  const { t, locale } = useTranslation()
  const { mutate, isSuccess, isError, isLoading } =
    api.users.validateAccount.useMutation()

  useEffect(() => {
    mutate(
      { jwt },
      { onSuccess: () => setTimeout(() => setTriggerClock(() => true), 2000) },
    )
  }, [jwt, mutate])

  useEffect(() => {
    if (triggerClock) {
      const interval = setInterval(() => {
        setCount((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }

    return () => null
  }, [triggerClock, count])

  useEffect(() => {
    if (count === 0) {
      router.push(`/${locale}/sign-in`)
    }
  }, [count, locale, router])

  return (
    <div className="p-4">
      {isLoading && <DisplayMessage message={t("validateAccount.loading")} />}
      {isSuccess && (
        <DisplayMessage message={t("validateAccount.success")}>
          {triggerClock && (
            <p>
              {t("validateAccount.redirect", {
                count,
              })}
            </p>
          )}
        </DisplayMessage>
      )}
      {isError && <DisplayMessage message={t("validateAccount.error")} />}
    </div>
  )
}

export default Page
