import type { Config } from "tailwindcss"

const config: Config = {
  content: [],
  theme: {
    extend: {
      borderRadius: {
        default: "0.5rem",
      },
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
}

export default config
