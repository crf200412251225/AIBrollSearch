/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // Cinema Studio 暗色调色板
        ink: {
          950: "#0a0a0b", // 主背景
          900: "#111114", // 次背景
          850: "#16161a",
          800: "#18181b", // 表面层
          750: "#1f1f24",
          700: "#27272a", // 边框
          600: "#3f3f46",
          500: "#52525b",
          400: "#71717a",
          300: "#a1a1aa", // 次文字
          200: "#d4d4d8",
          100: "#f4f4f5",
          50: "#fafafa", // 主文字
        },
        amber: {
          // 暖琥珀强调色（自定义，覆盖默认 amber）
          DEFAULT: "#f59e0b",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        rust: {
          // 第二强调色（暖橘红，用于点缀）
          DEFAULT: "#fb7185",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        sans: ['"Noto Sans SC"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
