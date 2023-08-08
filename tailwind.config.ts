import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        alovera: "OpenSans",
      },
      backgroundImage: {
          'main': "url('../public/backgroundimage.png')",
      },
    },
    keyframes:{
      jelly: {
        '0%': {},
        '100%': {
          'scale': '1 1',
        },
        '25%': {
          'scale': '0.9 1.1',
        },
        '50%': {
          'scale': '1.1 0.9',
        },
        '75%': {
          'scale': '0.95 1.05',
        },
      },
    },
    animation: {
      'jelly': 'jelly 0.5s',
    },
  },
  plugins: [],
}
export default config