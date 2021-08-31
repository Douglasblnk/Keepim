import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from 'virtual:generated-pages';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import 'virtual:windi.css';

library.add([faArrowRight, faSpinner]);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

router.isReady().then(async() => {
  app
    .component('FIcon', FontAwesomeIcon)
    .mount('#app');
});
