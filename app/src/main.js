import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'virtual:windi.css';
import App from './App.vue';

import icons from '@/utils/icons';
import createRouterInstance from '@/routes';
import { validateToken } from '@/utils/token';

icons();

const router = createRouterInstance();

const app = createApp(App);

app.use(router);

router.isReady().then(async() => {
  await validateToken(router.currentRoute);

  app
    .component('FIcon', FontAwesomeIcon)
    .mount('#app');
});
