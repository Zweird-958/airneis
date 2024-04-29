import { Locale } from "@airneis/config"

type ValuesType = {
  [key in Locale]: string
}
type TranslationsType = {
  validationTemplate: {
    subject: ValuesType
    body: {
      heading: ValuesType
      firstParagraph: ValuesType
      secondParagraph: ValuesType
      buttonText: ValuesType
      thirdParagraph: ValuesType
      signature: ValuesType
    }
  }
}

export const translations: TranslationsType = {
  validationTemplate: {
    subject: {
      en: "Activate your account",
      fr: "Activez votre compte",
    },
    body: {
      heading: {
        en: "Hey",
        fr: "Salut",
      },
      firstParagraph: {
        en: "✨ Your home deserves the best in terms of decoration, and we're here to help you achieve it. But before you dive into our selection of stylish furniture, you need to activate your account!",
        fr: "✨ Votre chez-vous mérite ce qu'il y a de mieux en termes de décoration, et nous sommes là pour vous aider à le réaliser. Mais avant de vous plonger dans notre sélection de meubles élégants, vous devez activer votre compte !",
      },
      secondParagraph: {
        en: "🪄 It's as easy as pie: click on the link below to start making your home a true haven of peace:",
        fr: "🪄 C'est simple comme bonjour : cliquez sur le lien ci-dessous pour commencer à faire de votre maison un véritable havre de paix :",
      },
      buttonText: {
        en: "Activate my account",
        fr: "Activer mon compte",
      },
      thirdParagraph: {
        en: "🌈 Once that's done, get ready to discover unique pieces that are sure to make a statement in your home.",
        fr: "🌈 Une fois que c'est fait, préparez-vous à découvrir des pièces uniques qui ne manqueront pas de faire sensation chez vous.",
      },
      signature: {
        en: "See you soon,\nThe Airneis team 🏡",
        fr: "À très vite,\nL'équipe de Airneis 🏡",
      },
    },
  },
}
