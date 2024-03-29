import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Tailwind,
  Text,
} from "@react-email/components"
import * as React from "react"

import { Locale } from "@airneis/types"

import baseConfig from "../../../../tailwind.config"
import { translations } from "../translations"

type Props = {
  name: string
  locale: Locale
  href: string
}

export const ValidationTemplate = ({ name, locale, href }: Props) => (
  <Html>
    <Head>
      <Font fontFamily="Arial" fallbackFontFamily="Arial" />
    </Head>
    <Body>
      <Tailwind config={baseConfig}>
        <Container className="bg-neutral-50 shadow-lg rounded-lg p-10">
          <Heading as="h2" className="mt-0">
            {`${translations.validationTemplate.body.heading[locale]} ${name},`}
          </Heading>
          <Text>
            {translations.validationTemplate.body.firstParagraph[locale]}
          </Text>
          <Text>
            {translations.validationTemplate.body.secondParagraph[locale]}
          </Text>
          <Button
            href={href}
            className="bg-green-500 hover:bg-green-700 rounded-md px-4 py-2 text-white font-bold"
          >
            {translations.validationTemplate.body.buttonText[locale]}
          </Button>

          <Text className="mt-12">
            {translations.validationTemplate.body.thirdParagraph[locale]}
          </Text>
          <Hr />
          <Text className="whitespace-pre-line mb-0">
            {translations.validationTemplate.body.signature[locale]}
          </Text>
        </Container>
      </Tailwind>
    </Body>
  </Html>
)

export default ValidationTemplate
