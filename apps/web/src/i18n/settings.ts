import { sharedConfig } from "@airneis/config"

import config, { Namespace } from "@/utils/config"

export const getOptions = (
  lng = sharedConfig.fallbackLng,
  ...ns: Namespace[]
) => ({
  supportedLngs: sharedConfig.languageKeys,
  fallbackLng: sharedConfig.fallbackLng,
  lng,
  fallbackNS: config.locale.defaultNamespace,
  defaultNS: config.locale.defaultNamespace,
  ns,
})
