import { createApp } from 'vue'

import App from './App.vue'
import { applyPlugins } from '@/plugins'

import '@/styles/index.sass'
import 'uno.css'
import 'uno:components.css'
import 'uno:utilities.css'

const app = createApp(App)

const plugins = applyPlugins(app)

Promise.all(plugins).then(() => {
  app.mount('#app')
})
