import { createApp } from 'vue';

import 'uno.css'
import App from './App.vue';

import createRouterInstance from '@/routes';
import { validateToken } from '@/utils/token';

const router = createRouterInstance();

const app = createApp(App);

app.use(router);

router.isReady().then(() => {
  validateToken(router.currentRoute).then(() => {
    app.mount('#app');
  });
});
