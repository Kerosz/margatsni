module.exports = {
  mode: 'jit',
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    enabled: true,
    content: ['./src/**/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  },
  darkMode: false,
  theme: {
    extend: {
      fill: (theme) => ({
        red: theme('colors.red.primary'),
        black: theme('colors.black.light'),
      }),
      colors: {
        white: '#ffffff',
        blue: {
          medium: '#005c98',
        },
        black: {
          light: '#262626',
          faded: '#00000059',
        },
        gray: {
          base: '#616161',
          background: '#fafafa',
          primary: '#dbdbdb',
        },
        red: {
          primary: '#ed4956',
        },
      },
      height: {
        fit: 'fit-content',
      },
      maxHeight: {
        'img-base': '781px',
        'img-lg': '665px',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
