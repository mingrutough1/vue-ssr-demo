import Vue from 'vue';
import Router from 'vue-router';
import Top from '../components/top.vue';

Vue.use(Router);

function createRouter() {
  const routes = [
    {
      path: '/top',
      component: Top
    },
    {
      path: '/bottom',
      component: () => import('../components/bottom.vue')   // 异步路由
    }
  ];

  const router = new Router({
    mode: 'history',
    routes
  });

  return router;
}

export default createRouter;