/* eslint-disable key-spacing */

import { ClosePopup, Notify, Quasar, Ripple } from 'quasar'
import iconSet from 'quasar/icon-set/mdi-v6'
import lang from 'quasar/lang/pt-BR'

export function install(app) {
  app.use(Quasar, {
    iconSet,
    lang,
    plugins: {
      Notify,
    },
    directives: {
      ClosePopup,
      Ripple,
    },
    config: {
      notify: {
        position: 'top',
        timeout: 5000,
      },
      brand: {
        'primary'     : 'var(--color-primary)',
        'secondary'   : 'var(--color-secondary)',
        'accent'      : 'var(--color-accent)',

        'dark'        : 'var(--color-background)',
        'dark-page'   : 'var(--color-background)',

        'positive'    : 'var(--color-positive)',
        'negative'    : 'var(--color-negative)',
        'info'        : 'var(--color-info)',
        'warning'     : 'var(--color-warning)',
      },
    },
  })
}
