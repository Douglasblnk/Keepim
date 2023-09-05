import { createPinia } from 'pinia'

const pinia = createPinia()

export function install(app) {
  app.use(pinia)
}
