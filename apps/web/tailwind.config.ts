import type { Config } from "tailwindcss"

import baseConfig from "../../tailwind.config"

const config: Config = {
  content: ["./src/app/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      width: {
        product: "20rem",
      },
      maxWidth: {
        "product-list": "63.5rem",
      },
      gap: {
        product: "0.75rem",
      },
    },
  },
  plugins: [],
  presets: [baseConfig],
}
export default config
