import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from './layout/routes.js';


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
 