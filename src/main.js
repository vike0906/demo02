// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Antd from 'ant-design-vue';
import { message,notification } from 'ant-design-vue'
import store from './store/';
import router from './router'
import 'ant-design-vue/dist/antd.css';
import './assets/style/init.css';

Vue.config.productionTip = false
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
message.config({
  top: `20px`,
  duration: 2,
  maxCount: 3,
});
Vue.use(Antd);

router.beforeEach((to, from, next) => {
  let toPath = to.path;
  if (toPath == '/login'||toPath=='/logout') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && toPath != '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});


