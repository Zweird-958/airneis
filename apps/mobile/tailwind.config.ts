import type { Config } from "tailwindcss"
// @ts-expect-error - no types
import nativewind from "nativewind/preset"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {},
  presets: [nativewind],
}

export default config
