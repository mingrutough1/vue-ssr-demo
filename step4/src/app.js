import Vue from 'vue';
import createStore from './store/store.js';
import createRouter from './router/router.js';
import App from './components/app.vue';

export function createApp() {
    const store = createStore();
    const router = createRouter();
    const app = new Vue({
      store,
      router,
      render: h => h(App)
    });
  
    return { app, store, router, App };
}