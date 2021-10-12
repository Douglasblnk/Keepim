import routes from 'virtual:generated-pages';
import { createRouter, createWebHistory } from 'vue-router';

import {
  getToken,
  removeToken,
} from '@/utils/token';

function hasToken() {
  const token = getToken();

  return !!token;
}

function handleIndexPage({ to, router }) {
  const { replace } = router;

  return hasToken() && replace('home');
}

function handleUncauthRoute({ replace }) {
  if (hasToken()) return replace('/home');

  removeToken();
  return replace('/');
}

function handleCommonRoutes({ to, router }) {
  const { meta, name } = to;
  const { replace } = router;

  if (!name) return handleUncauthRoute({ replace });

  if (!meta.auth || !hasToken()) {
    removeToken();
    return replace('/');
  }
}

function handleRoutes({ to, next, router }) {
  if (to.name === 'index') {
    handleIndexPage({ to, router });
    return next();
  }

  handleCommonRoutes({ to, router });
  return next();
}

export default function createRouterInstance() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach((to, from, next) => handleRoutes({ to, from, next, router }));

  return router;
}
