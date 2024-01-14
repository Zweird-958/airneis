import type { Config } from "tailwindcss"
import baseConfig from "@airneis/tailwind"

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {},
  plugins: [],
  presets: [baseConfig],
}
export default config
