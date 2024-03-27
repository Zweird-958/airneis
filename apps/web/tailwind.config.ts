import type { Config } from "tailwindcss"

import baseConfig from "../../tailwind.config"

const config: Config = {
  content: ["./src/app/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [baseConfig],
}
export default config
