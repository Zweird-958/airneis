import DescriptionField from "@/components/forms/fields/DescriptionField"
import { Form } from "@/components/ui/Form"
import { useForm } from "react-hook-form"

const ContactForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      subject: "",
      description: "",
    },
  })
    
    return (
        <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
            <EmailField control={form.control} />
            <SubjectField control={form.control} />
            <DescriptionField control={form.control} />
            <Button type="submit">{t("send")}</Button>
        </Form>
}

export default ContactForm
