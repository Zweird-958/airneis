import ContactForm from "@/components/forms/ContactForm"
import { FormLayout } from "@/components/ui/Form/FormLayout"
import { useTranslation } from "@/i18n"
import { PageProps } from "@/types/common"

const ContactPage = async ({ params: { locale } }: PageProps) => {
  const { t } = await useTranslation(locale, "forms")

  return (
    <FormLayout labelForm={t("contact.title")}>
      <ContactForm />
    </FormLayout>
  )
}

export default ContactPage
