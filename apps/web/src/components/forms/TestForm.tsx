"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import UsernameField from "@/components/forms/fields/UsernameField"
import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"

const testSchema = z.object({
  username: z.string().min(3).max(6),
})

type TestFormSchema = z.infer<typeof testSchema>

const TestForm = () => {
  const form = useForm<TestFormSchema>({
    resolver: zodResolver(testSchema),
    defaultValues: { username: "" },
  })
  const onSubmit: SubmitHandler<TestFormSchema> = (values) => {
    // eslint-disable-next-line no-alert -- Will be removed in the future
    alert(`Submitted with ${JSON.stringify(values)}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <UsernameField control={form.control} />
        <Button>Submit</Button>
      </form>
    </Form>
  )
}

export default TestForm
