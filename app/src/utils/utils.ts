import type { QNotifyCreateOptions } from 'quasar'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import objectSupport from 'dayjs/plugin/objectSupport'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Notify } from 'quasar'

export const regexRules = {
  date: /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}/,
  time: /^(2[0-3]|[00]?[0-9]):([0-5]?[0-9])$/,
}

export interface FieldProps {
  name?: string
  veeRules?: string | Record<string, unknown>
  modelValue?: any
}

const messageOptions = {
  message: '',
  type: 'success',
  timeout: 2000,
}

export const isObjectEmpty = <T extends object>(obj: T | undefined) => typeof obj === 'object' && !Object.keys(obj).length

export function checkImgExists(image: string | undefined) {
  if (!image)
    return false

  const img = new Image()
  img.src = image

  if (img.complete) {
    return true
  }

  else {
    img.onload = () => {
      return true
    }
    img.onerror = () => {
      return false
    }
  }
}

export function eventHook() {
  const fns: Record<string, (_agr1: any, _agr2: any) => void> = {}

  const off = (event: string) => {
    delete fns[event]
  }

  const on = (event: string, fn: (_evt: string, _func: () => void) => void) => {
    fns[event] = fn
  }

  const trigger = (event: string, param: any) => {
    fns[event]?.(param, () => off(event))
  }

  return {
    on,
    off,
    trigger,
  }
}

export async function notify(options: QNotifyCreateOptions) {
  const { message, type, timeout } = { ...messageOptions, ...options }

  const msg = unref(message)

  return new Promise<void>((resolve) => {
    Notify.create({
      type: type || 'success',
      message: msg,
      timeout,
      ...options,
    })

    timeout
      ? setTimeout(() => resolve(), timeout)
      : resolve()
  })
}

dayjs.locale(ptBR)
dayjs.extend(objectSupport)
dayjs.extend(customParseFormat)

export { dayjs }
