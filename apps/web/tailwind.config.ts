import type { Config } from "tailwindcss"

import baseConfig from "../../tailwind.config"

const config: Config = {
  content: ["./src/app/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        error: "hsl(var(--error))",
        card: "hsl(var(--card))",
      },
      borderColor: {
        default: "hsl(var(--border))",
      },
    },
  },
  plugins: [],
  presets: [baseConfig],
}
export default config
