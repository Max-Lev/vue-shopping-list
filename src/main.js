import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from './layout/routes.js';
import firebaseApp from './firebase/config.js';
Vue.use(firebaseApp);
Vue.config.productionTip = false
export const serverBus = new Vue();
new Vue({
  render: h => h(App),
  router,
  // firebaseApp
}).$mount('#app')
