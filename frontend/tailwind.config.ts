import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            background: "#f5f5f5",
            foreground: "#000",
            primary: {
              foreground: "#000",
              DEFAULT: "##FFE03D",
              50: "#FFFBD8",
              100: "#FFF3CC",
              200: "#FFE999",
              300: "#FFE066",
              400: "#FFD933",
              500: "#FFE03D",
              600: "#FFC600",
              700: "#E6AD00",
              800: "#B38A00",
              900: "#806600",
            },
            secondary: {
              foreground: "#000",
              DEFAULT: "#598DFF",
              50: "#E6F0FF",
              100: "#CCE0FF",
              200: "#99C1FF",
              300: "#66A2FF",
              400: "#3383FF",
              500: "#598DFF",
              600: "#0052CC",
              700: "#004099",
              800: "#002E66",
              900: "#001C33",
            },
            success: {
              foreground: "#fff",
              DEFAULT: "#00C48C",
              50: "#E6F9F3",
              100: "#CCEFE7",
              200: "#99DFCF",
              300: "#66CFB8",
              400: "#33BF9F",
              500: "#00C48C",
              600: "#00A072",
              700: "#008058",
              800: "#00603F",
              900: "#004026",
            },
            warning: {
              foreground: "#fff",
              DEFAULT: "#FFE523",
              50: "#FFF9E6",
              100: "#FFF3CC",
              200: "#FFE999",
              300: "#FFE066",
              400: "#FFD933",
              500: "#FFE523",
              600: "#FFC600",
              700: "#E6AD00",
              800: "#B38A00",
              900: "#806600",
            },
            danger: {
              foreground: "#fff",
              DEFAULT: "#FF5E79",
              50: "#FFE6EB",
              100: "#FFCCD7",
              200: "#FF99AF",
              300: "#FF6687",
              400: "#FF335F",
              500: "#FF5E79",
              600: "#FF0038",
              700: "#CC002E",
              800: "#990023",
              900: "#660019",
            },
          },
        },
      },
    }),
  ],
};
export default config;
