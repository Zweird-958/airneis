"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import UsernameField from "@/components/forms/fields/UsernameField"
import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"

const testSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "length" })
    .max(10, { message: "length" }),
})

type TestFormSchema = z.infer<typeof testSchema>

/* eslint-disable no-alert -- Will be replaced with toasts in the future */
const TestForm = () => {
  const form = useForm<TestFormSchema>({
    resolver: zodResolver(testSchema),
    defaultValues: { username: "" },
  })
  const onSubmit: SubmitHandler<TestFormSchema> = (values) => {
    alert(`Submitted with ${JSON.stringify(values)}`)
  }

  return (
    <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
      <UsernameField control={form.control} />
      <Button>Submit</Button>
    </Form>
  )
}

export default TestForm
