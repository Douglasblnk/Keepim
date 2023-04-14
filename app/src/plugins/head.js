import { createHead } from '@vueuse/head'

const head = createHead()

export function install(app) {
  app.use(head)
}
