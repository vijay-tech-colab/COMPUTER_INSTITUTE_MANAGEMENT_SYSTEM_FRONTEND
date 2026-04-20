import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", "sans-serif"],
                heading: ["var(--font-heading)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
        },
    },
    plugins: [],
};

export default config;