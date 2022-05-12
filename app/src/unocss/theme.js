/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */

/**
 * @typedef { import("@unocss/preset-uno/dist/theme") } BaseTheme
 */

// import defaultTheme from 'windicss/defaultTheme'

const baseSize = {
  'col-1': '8.333333333333334%',
  'col-2': '16.666666666666668%',
  'col-3': '25%',
  'col-4': '33.33333333333333%',
  'col-5': '41.66666666666667%',
  'col-6': '50%',
  'col-7': '58.333333333333336%',
  'col-8': '66.66666666666667%',
  'col-9': '75%',
  'col-10': '83.33333333333334%',
  'col-11': '91.66666666666667%',
  'col-12': '100%',
  'prose': '65ch',
}

/**
 * @type { BaseTheme }
 */
export default {
  /* ---------------------------------------- */
  /*                   Core                   */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/variants.html
  // https://tailwindcss.com/docs/breakpoints
  breakpoints: {
    sm: '600px',
    md: '1240px',
    lg: '1440px',
    xl: '1920px',
    xxl: '2560px',
  },

  /* ---------------------------------------- */
  /*                  Colors                  */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/colors.html#customization
  colors: {
    background: '#2C2D30',
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    gray: {
      50: '#f2f2f2',
      100: '#e8e8e8',
      200: '#d5d5d5',
      300: '#bdbdbd',
      400: '#9e9e9e',
      500: '#4E4F55',
    },

    positive: '#21BA45',
    negative: '#F56C6C',
    info: '#31CCEC',
    warning: '#F2C037',

    primary: '#4599C8',
    secondary: '#A4C2E4',
    ascendent: '#3D3E43',
  },

  /* ---------------------------------------- */
  /*                  Spacing                 */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/spacing.html
  spacing: {
    DEFAULT: '4px',
    px: '1px',
    0: '0px',
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '48px',
    xxl: '64px',
  },

  /* ---------------------------------------- */
  /*                  Sizing                  */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/sizing.html
  width: {
    ...baseSize,
  },

  height: {
    ...baseSize,
  },

  /* ---------------------------------------- */
  /*                   Flex                   */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/flexbox.html

  /* ---------------------------------------- */
  /*                   Grid                   */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/grid.html

  /* ---------------------------------------- */
  /*                Positioning               */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/positioning.html
  zIndex: {
    auto: 'auto',
    0: '0',
    inherit: 'inherit',
    marginals: '2000',
    fullscreen: '6000',
    notify: '9500',
    max: '9998',
  },

  /* ---------------------------------------- */
  /*                    SVG                   */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/svg.html

  /* ---------------------------------------- */
  /*                  Filter                  */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/filters.html
  blur: {
    'DEFAULT': '4px',
    'none': '0',
    'sm': '4px',
    'md': '8px',
    'lg': '16px',
    'xl': '24px',
    '2xl': '48px',
  },
  dropShadow: {
    // ...defaultTheme.dropShadow,
    DEFAULT: '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
    0: '0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(0, 0, 0, 0.14), 0 0 0 rgba(0, 0, 0, 0.12)',
    1: '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)',
    2: '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
    3: '0 1px 8px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12)',
    4: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14), 0 1px 10px rgba(0, 0, 0, 0.12)',
    5: '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12)',
    6: '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12)',
    7: '0 4px 5px -2px rgba(0, 0, 0, 0.2), 0 7px 10px 1px rgba(0, 0, 0, 0.14), 0 2px 16px 1px rgba(0, 0, 0, 0.12)',
    8: '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)',
    9: '0 5px 6px -3px rgba(0, 0, 0, 0.2), 0 9px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 16px 2px rgba(0, 0, 0, 0.12)',
    10: '0 6px 6px -3px rgba(0, 0, 0, 0.2), 0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12)',
    11: '0 6px 7px -4px rgba(0, 0, 0, 0.2), 0 11px 15px 1px rgba(0, 0, 0, 0.14), 0 4px 20px 3px rgba(0, 0, 0, 0.12)',
    12: '0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12)',
    13: '0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12)',
    14: '0 7px 9px -4px rgba(0, 0, 0, 0.2), 0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12)',
    15: '0 8px 9px -5px rgba(0, 0, 0, 0.2), 0 15px 22px 2px rgba(0, 0, 0, 0.14), 0 6px 28px 5px rgba(0, 0, 0, 0.12)',
    16: '0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12)',
    17: '0 8px 11px -5px rgba(0, 0, 0, 0.2), 0 17px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 32px 5px rgba(0, 0, 0, 0.12)',
    18: '0 9px 11px -5px rgba(0, 0, 0, 0.2), 0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12)',
    19: '0 9px 12px -6px rgba(0, 0, 0, 0.2), 0 19px 29px 2px rgba(0, 0, 0, 0.14), 0 7px 36px 6px rgba(0, 0, 0, 0.12)',
    20: '0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12)',
    21: '0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 21px 33px 3px rgba(0, 0, 0, 0.14), 0 8px 40px 7px rgba(0, 0, 0, 0.12)',
    22: '0 10px 14px -6px rgba(0, 0, 0, 0.2), 0 22px 35px 3px rgba(0, 0, 0, 0.14), 0 8px 42px 7px rgba(0, 0, 0, 0.12)',
    23: '0 11px 14px -7px rgba(0, 0, 0, 0.2), 0 23px 36px 3px rgba(0, 0, 0, 0.14), 0 9px 44px 8px rgba(0, 0, 0, 0.12)',
    24: '0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)',
  },

  /* ---------------------------------------- */
  /*                  Effects                 */
  /* ---------------------------------------- */
  // https://windicss.org/utilities/effects.html
  boxShadow: {
    'none': 'none',
    'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    'DEFAULT': '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
    '0': '0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(0, 0, 0, 0.14), 0 0 0 rgba(0, 0, 0, 0.12)',
    '1': '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)',
    '2': '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
    '3': '0 1px 8px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12)',
    '4': '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14), 0 1px 10px rgba(0, 0, 0, 0.12)',
    '5': '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12)',
    '6': '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12)',
    '7': '0 4px 5px -2px rgba(0, 0, 0, 0.2), 0 7px 10px 1px rgba(0, 0, 0, 0.14), 0 2px 16px 1px rgba(0, 0, 0, 0.12)',
    '8': '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)',
    '9': '0 5px 6px -3px rgba(0, 0, 0, 0.2), 0 9px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 16px 2px rgba(0, 0, 0, 0.12)',
    '10': '0 6px 6px -3px rgba(0, 0, 0, 0.2), 0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12)',
    '11': '0 6px 7px -4px rgba(0, 0, 0, 0.2), 0 11px 15px 1px rgba(0, 0, 0, 0.14), 0 4px 20px 3px rgba(0, 0, 0, 0.12)',
    '12': '0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12)',
    '13': '0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12)',
    '14': '0 7px 9px -4px rgba(0, 0, 0, 0.2), 0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12)',
    '15': '0 8px 9px -5px rgba(0, 0, 0, 0.2), 0 15px 22px 2px rgba(0, 0, 0, 0.14), 0 6px 28px 5px rgba(0, 0, 0, 0.12)',
    '16': '0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12)',
    '17': '0 8px 11px -5px rgba(0, 0, 0, 0.2), 0 17px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 32px 5px rgba(0, 0, 0, 0.12)',
    '18': '0 9px 11px -5px rgba(0, 0, 0, 0.2), 0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12)',
    '19': '0 9px 12px -6px rgba(0, 0, 0, 0.2), 0 19px 29px 2px rgba(0, 0, 0, 0.14), 0 7px 36px 6px rgba(0, 0, 0, 0.12)',
    '20': '0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12)',
    '21': '0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 21px 33px 3px rgba(0, 0, 0, 0.14), 0 8px 40px 7px rgba(0, 0, 0, 0.12)',
    '22': '0 10px 14px -6px rgba(0, 0, 0, 0.2), 0 22px 35px 3px rgba(0, 0, 0, 0.14), 0 8px 42px 7px rgba(0, 0, 0, 0.12)',
    '23': '0 11px 14px -7px rgba(0, 0, 0, 0.2), 0 23px 36px 3px rgba(0, 0, 0, 0.14), 0 9px 44px 8px rgba(0, 0, 0, 0.12)',
    '24': '0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)',
    'up-0': '0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(0, 0, 0, 0.14), 0 0 0 rgba(0, 0, 0, 0.12)',
    'up-1': '0 -1px 3px rgba(0, 0, 0, 0.2), 0 -1px 1px rgba(0, 0, 0, 0.14), 0 -2px 1px -1px rgba(0, 0, 0, 0.12)',
    'up-2': '0 -1px 5px rgba(0, 0, 0, 0.2), 0 -2px 2px rgba(0, 0, 0, 0.14), 0 -3px 1px -2px rgba(0, 0, 0, 0.12)',
    'up-3': '0 -1px 8px rgba(0, 0, 0, 0.2), 0 -3px 4px rgba(0, 0, 0, 0.14), 0 -3px 3px -2px rgba(0, 0, 0, 0.12)',
    'up-4': '0 -2px 4px -1px rgba(0, 0, 0, 0.2), 0 -4px 5px rgba(0, 0, 0, 0.14), 0 -1px 10px rgba(0, 0, 0, 0.12)',
    'up-5': '0 -3px 5px -1px rgba(0, 0, 0, 0.2), 0 -5px 8px rgba(0, 0, 0, 0.14), 0 -1px 14px rgba(0, 0, 0, 0.12)',
    'up-6': '0 -3px 5px -1px rgba(0, 0, 0, 0.2), 0 -6px 10px rgba(0, 0, 0, 0.14), 0 -1px 18px rgba(0, 0, 0, 0.12)',
    'up-7': '0 -4px 5px -2px rgba(0, 0, 0, 0.2), 0 -7px 10px 1px rgba(0, 0, 0, 0.14), 0 -2px 16px 1px rgba(0, 0, 0, 0.12)',
    'up-8': '0 -5px 5px -3px rgba(0, 0, 0, 0.2), 0 -8px 10px 1px rgba(0, 0, 0, 0.14), 0 -3px 14px 2px rgba(0, 0, 0, 0.12)',
    'up-9': '0 -5px 6px -3px rgba(0, 0, 0, 0.2), 0 -9px 12px 1px rgba(0, 0, 0, 0.14), 0 -3px 16px 2px rgba(0, 0, 0, 0.12)',
    'up-10': '0 -6px 6px -3px rgba(0, 0, 0, 0.2), 0 -10px 14px 1px rgba(0, 0, 0, 0.14), 0 -4px 18px 3px rgba(0, 0, 0, 0.12)',
    'up-11': '0 -6px 7px -4px rgba(0, 0, 0, 0.2), 0 -11px 15px 1px rgba(0, 0, 0, 0.14), 0 -4px 20px 3px rgba(0, 0, 0, 0.12)',
    'up-12': '0 -7px 8px -4px rgba(0, 0, 0, 0.2), 0 -12px 17px 2px rgba(0, 0, 0, 0.14), 0 -5px 22px 4px rgba(0, 0, 0, 0.12)',
    'up-13': '0 -7px 8px -4px rgba(0, 0, 0, 0.2), 0 -13px 19px 2px rgba(0, 0, 0, 0.14), 0 -5px 24px 4px rgba(0, 0, 0, 0.12)',
    'up-14': '0 -7px 9px -4px rgba(0, 0, 0, 0.2), 0 -14px 21px 2px rgba(0, 0, 0, 0.14), 0 -5px 26px 4px rgba(0, 0, 0, 0.12)',
    'up-15': '0 -8px 9px -5px rgba(0, 0, 0, 0.2), 0 -15px 22px 2px rgba(0, 0, 0, 0.14), 0 -6px 28px 5px rgba(0, 0, 0, 0.12)',
    'up-16': '0 -8px 10px -5px rgba(0, 0, 0, 0.2), 0 -16px 24px 2px rgba(0, 0, 0, 0.14), 0 -6px 30px 5px rgba(0, 0, 0, 0.12)',
    'up-17': '0 -8px 11px -5px rgba(0, 0, 0, 0.2), 0 -17px 26px 2px rgba(0, 0, 0, 0.14), 0 -6px 32px 5px rgba(0, 0, 0, 0.12)',
    'up-18': '0 -9px 11px -5px rgba(0, 0, 0, 0.2), 0 -18px 28px 2px rgba(0, 0, 0, 0.14), 0 -7px 34px 6px rgba(0, 0, 0, 0.12)',
    'up-19': '0 -9px 12px -6px rgba(0, 0, 0, 0.2), 0 -19px 29px 2px rgba(0, 0, 0, 0.14), 0 -7px 36px 6px rgba(0, 0, 0, 0.12)',
    'up-20': '0 -10px 13px -6px rgba(0, 0, 0, 0.2), 0 -20px 31px 3px rgba(0, 0, 0, 0.14), 0 -8px 38px 7px rgba(0, 0, 0, 0.12)',
    'up-21': '0 -10px 13px -6px rgba(0, 0, 0, 0.2), 0 -21px 33px 3px rgba(0, 0, 0, 0.14), 0 -8px 40px 7px rgba(0, 0, 0, 0.12)',
    'up-22': '0 -10px 14px -6px rgba(0, 0, 0, 0.2), 0 -22px 35px 3px rgba(0, 0, 0, 0.14), 0 -8px 42px 7px rgba(0, 0, 0, 0.12)',
    'up-23': '0 -11px 14px -7px rgba(0, 0, 0, 0.2), 0 -23px 36px 3px rgba(0, 0, 0, 0.14), 0 -9px 44px 8px rgba(0, 0, 0, 0.12)',
    'up-24': '0 -11px 15px -7px rgba(0, 0, 0, 0.2), 0 -24px 38px 3px rgba(0, 0, 0, 0.14), 0 -9px 46px 8px rgba(0, 0, 0, 0.12)',
    'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  fontSize: {
    sm: '0.75rem',
    base: '1rem',
    md: '1.5rem',
    lg: '2.25rem',
  },
}
