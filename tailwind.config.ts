import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * GRAZA style system.
 * Legacy token names (midnight / porcelain / silver / cobalt / graphite) are kept
 * as aliases so existing components inherit the new palette:
 *   midnight  -> Olive Ink      porcelain -> Linen Cream / Buttery Peach
 *   silver    -> Olive Ink      cobalt    -> Olive Ink
 *   graphite  -> Olive Ink
 */
const OLIVE = "#3c422e";
const CREAM = "#fff4ec";
const PEACH = "#f6e6d9";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "olive-ink": { DEFAULT: OLIVE, dark: "#2b3021", light: "#4d5439" },
        "linen-cream": CREAM,
        "buttery-peach": PEACH,
        "squeeze-bottle-green": "#9eef80",
        "evoo-yellow-green": "#d1e030",
        "mustard-sun": "#fbd535",

        // Legacy aliases
        midnight: { DEFAULT: OLIVE, dark: "#2b3021", light: "#4d5439" },
        porcelain: { DEFAULT: CREAM, pure: CREAM, muted: PEACH },
        silver: { DEFAULT: OLIVE, light: PEACH, dark: OLIVE },
        cobalt: { DEFAULT: OLIVE, hover: "#2b3021", light: "#4d5439" },
        graphite: { DEFAULT: OLIVE, muted: "#5b6148" },
      },
      fontFamily: {
        // Display: ITC Garamond Condensed (substitute)
        serif: ["var(--font-itc-garamond-condensed)", "Georgia", "serif"],
        // Body / utility: GT Alpina Typewriter (substitute)
        sans: ["var(--font-gt-alpina-typewriter)", "Georgia", "serif"],
        // Badges / micro-labels: Apercu (substitute)
        mono: ["var(--font-apercu)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        images: "20px",
        buttons: "10px",
        inputs: "10px",
        capsule: "32px",
      },
      scale: { 103: "1.03" },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 12s linear infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
