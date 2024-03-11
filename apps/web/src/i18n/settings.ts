import { sharedConfig } from "@airneis/config"

import config, { Namespace } from "@/utils/config"

export const getOptions = (...ns: Namespace[]) => ({
  supportedLngs: sharedConfig.languageKeys,
  fallbackLng: sharedConfig.fallbackLng,
  fallbackNS: config.locale.defaultNamespace,
  defaultNS: config.locale.defaultNamespace,
  ns: ns.length ? ns : config.locale.defaultNamespace,
})
