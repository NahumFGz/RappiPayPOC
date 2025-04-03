/** @type {import('tailwindcss').Config} */

//! con node 20
// const { nextui } = require('@nextui-org/react')

//! con node 22
import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              margin: '20px 0',
              textAlign: 'left'
            },
            th: {
              backgroundColor: theme('colors.gray.100'),
              fontWeight: 'bold',
              padding: theme('spacing.2'),
              border: `1px solid ${theme('colors.gray.300')}`
            },
            td: {
              padding: theme('spacing.2'),
              border: `1px solid ${theme('colors.gray.300')}`
            },
            'tr:nth-child(even)': {
              backgroundColor: theme('colors.gray.50')
            },
            'tr:hover': {
              backgroundColor: theme('colors.gray.100')
            }
          }
        },
        dark: {
          css: {
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              margin: '20px 0',
              textAlign: 'left',
              borderColor: theme('colors.gray.700')
            },
            th: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.100'),
              fontWeight: 'bold',
              padding: theme('spacing.2'),
              border: `1px solid ${theme('colors.gray.700')}`
            },
            td: {
              padding: theme('spacing.2'),
              color: theme('colors.gray.300'),
              border: `1px solid ${theme('colors.gray.700')}`
            },
            'tr:nth-child(even)': {
              backgroundColor: theme('colors.gray.900')
            },
            'tr:hover': {
              backgroundColor: theme('colors.gray.800')
            }
          }
        }
      })
    }
  },
  darkMode: 'class', // Activar modo oscuro basado en la clase 'dark'
  plugins: [
    nextui(),
    typography // Plugin de Tailwind para Markdown
  ]
}
