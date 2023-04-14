import { configure, defineRule } from 'vee-validate'
import { email, min, regex, required } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json'

configure({
  generateMessage: localize({ pt_BR }),
})

defineRule('required', required)
defineRule('email', email)
defineRule('regex', regex)
defineRule('min', min)

export const regexRules = {
  date: /(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}/,
  time: /(0\d|1\d|2[0-3]):[0-5]\d/,
}

setLocale('pt_BR')

export function install() {}
