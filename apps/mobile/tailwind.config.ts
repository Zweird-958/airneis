import type { Config } from "tailwindcss"
// @ts-expect-error - no types
import nativewind from "nativewind/preset"
import baseConfig from "@airneis/tailwind"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {},
  presets: [baseConfig, nativewind],
}

export default config
