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
  <div className="p-4">
    <div className="bg-white p-3 rounded-lg shadow-lg w-fit">
      <p>{message}</p>
      {children}
    </div>
  </div>
)
const Page = ({ params: { jwt } }: Props) => {
  const router = useRouter()
  const [triggerClock, setTriggerClock] = useState(false)
  const [count, setCount] = useState(5)
  const { t, locale } = useTranslation()
  const { mutate, isSuccess, isError } = api.users.validateAccount.useMutation()

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

  if (isError) {
    return <DisplayMessage message={t("validateAccount.error")} />
  }

  if (isSuccess) {
    return (
      <DisplayMessage message={t("validateAccount.success")}>
        {triggerClock && (
          <p>
            {t("validateAccount.redirect", {
              count,
            })}
          </p>
        )}
      </DisplayMessage>
    )
  }

  return <DisplayMessage message={t("validateAccount.loading")} />
}

export default Page
