import type { Config } from "tailwindcss"

import baseConfig from "../../tailwind.config"

const config: Config = {
  content: ["./src/app/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        primary: "var(--primary)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
  presets: [baseConfig],
}
export default config
