/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './public/**/*.html', // public フォルダ内の HTML ファイルもスキャン対象
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: '#1D4ED8',
                secondary: '#9333EA',
            },
        },
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/forms'), // フォーム用プラグイン
    ],
    daisyui: {
        themes: ["light", "dark", "cupcake"],
        darkTheme: "dark",
    },
};
