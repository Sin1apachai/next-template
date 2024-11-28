import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                phone: '480px',
                ipad: '768px',
                pc: '1024px',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};

export default config;
