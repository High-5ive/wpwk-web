import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from "./store/store"

import router from './router/router'

var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

Vue.use(router)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  beforeCreate() {
    this.$store.dispatch("getUserInfo") //새로고침하더라도 항상 유지하도록 설정
  },
  render: h => h(App)
}).$mount('#app')