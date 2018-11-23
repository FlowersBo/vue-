/*
入口JS
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import TopHeader from './components/TopHeader/TopHeader.vue'
import {Button} from 'mint-ui'
import Split from './components/Split/Split.vue'
import './filters'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/14680195753bb38ebae14ab283cdaad8.gif'
//注册全局组件
Vue.component('TopHeader',TopHeader)
Vue.component(Button.name,Button)
Vue.component('Split',Split)
Vue.use(VueLazyload, {
  loading,
})
import './mock/mockServer'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
