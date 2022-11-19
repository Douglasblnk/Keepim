import { removeAccess } from '@/routes'

const regexRules = {
  date: /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}/,
  time: /^(2[0-3]|[00]?[0-9]):([0-5]?[0-9])$/,
}

const fieldProps = {
  name: String,
  veeRules: {
    type: [ String, Object ],
    default: '',
  },
  modelValue: { required: false },
}

const handleAuthorizationError = (error) => {
  const { status, data } = error

  if (status === 401 && data === 'JsonWebTokenError') { removeAccess() }

  return error
}

const eventHook = () => {
  const fns = []

  const off = (fn) => {
    const index = fns.indexOf(fn)

    if (index !== -1) {
      fns.splice(index, 1)
    }
  }

  const on = (fn) => {
    fns.push(fn)

    return {
      off: () => off(fn),
    }
  }

  const trigger = (param) => {
    for (const fn of fns) {
      fn(param)
    }
  }

  return {
    on,
    off,
    trigger,
  }
}

export default {
  regexRules,
  fieldProps,
  handleAuthorizationError,
  eventHook,
}
