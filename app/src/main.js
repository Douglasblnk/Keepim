import { createApp } from 'vue'
import { ClosePopup, Notify, Quasar, Ripple } from 'quasar'
import { configure, defineRule } from 'vee-validate'
import { email, min, regex, required } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json'

import iconSet from 'quasar/icon-set/svg-mdi-v6'
import lang from 'quasar/lang/pt-BR'

import '@/styles/index.sass'

import 'uno.css'
import 'uno:components.css'
import 'uno:utilities.css'

import App from './App.vue'

import createRouterInstance from '@/routes'
// import { validateToken } from '@/utils/token'

const router = createRouterInstance()

const app = createApp(App)

app.use(router)

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
      'primary': 'var(--color-primary)',
      'secondary': 'var(--color-secondary)',
      'accent': 'var(--color-accent)',

      'dark': 'var(--color-dark)',
      'dark-page': 'var(--color-dark-page)',

      'positive': 'var(--color-positive)',
      'negative': 'var(--color-negative)',
      'info': 'var(--color-info)',
      'warning': 'var(--color-warning)',
    },
  },
})

configure({
  generateMessage: localize({ pt_BR }),
})

defineRule('required', required)
defineRule('email', email)
defineRule('regex', regex)
defineRule('min', min)

setLocale('pt_BR')

app.mount('#app')
