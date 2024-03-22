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

import baseConfig from "../../../../tailwind.config"

type Props = {
  name?: string
  href?: string
}

export const ValidationTemplate = ({
  name = "Test",
  href = "https://www.google.com",
}: Props) => (
  <Html>
    <Head>
      <Font fontFamily="Arial" fallbackFontFamily="Arial" />
    </Head>
    <Body>
      <Tailwind config={baseConfig}>
        <Container className="bg-neutral-50 shadow-lg rounded-lg p-10">
          <Heading as="h2" className="mt-0">{`🎉 Salut ${name},`}</Heading>
          <Text>
            {
              "✨ Votre chez-vous mérite ce qu'il y a de mieux en termes de décoration, et nous sommes là pour vous aider à le réaliser. Mais avant de vous plonger dans notre sélection de meubles élégants, vous devez activer votre compte !"
            }
          </Text>
          <Text>
            {
              "🪄 C'est simple comme bonjour : cliquez sur le lien ci-dessous pour commencer à faire de votre maison un véritable havre de paix :"
            }
          </Text>
          <Button
            href={href}
            className="bg-green-500 hover:bg-green-700 rounded-md px-4 py-2 text-white font-bold"
          >
            {"Activer mon compte"}
          </Button>

          <Text className="mt-12">
            {
              "🌈 Une fois que c'est fait, préparez-vous à découvrir des pièces uniques qui ne manqueront pas de faire sensation chez vous."
            }
          </Text>
          <Hr />
          <Text className="whitespace-pre-line mb-0">
            {"À très vite,\nL'équipe de Airneis 🏡"}
          </Text>
        </Container>
      </Tailwind>
    </Body>
  </Html>
)

export default ValidationTemplate
