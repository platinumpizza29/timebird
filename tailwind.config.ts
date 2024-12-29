import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
import preline from "preline/plugin";

export default {
  content: ["./src/**/*.tsx", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  daisyui: {
    themes: ["corporate"],
  },
  plugins: [daisyui, preline],
} satisfies Config;
