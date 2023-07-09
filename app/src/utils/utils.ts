import type { QNotifyCreateOptions } from 'quasar'
import { Notify } from 'quasar'

export const regexRules = {
  date: /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}/,
  time: /^(2[0-3]|[00]?[0-9]):([0-5]?[0-9])$/,
}

export const fieldProps = {
  name: String,
  veeRules: {
    type: [ String, Object ],
    default: '',
  },
  modelValue: { required: false },
}

const messageOptions = {
  message: '',
  type: 'success',
  timeout: 2000,
}

export function notify(options: QNotifyCreateOptions) {
  const { message, type, timeout } = { ...messageOptions, ...options }

  const msg = unref(message)

  Notify.create({
    type: type || 'success',
    message: msg,
    timeout,
    ...options,
  })
}
