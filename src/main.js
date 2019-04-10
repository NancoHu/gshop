// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Button, Picker  } from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './store'

import './mock/mockServer' // 加载mockServer即可
import imgLoading from './common/images/imgloading.gif'
import './filters' // 加载过滤器
import 'mint-ui/lib/style.css'
import VueBus from './bus/eventBus' // 加载事件总线

Vue.config.productionTip = false

Vue.component(Button.name, Button)  // <mt-button>
Vue.component(Picker.name, Picker)  // <mt-picker>

Vue.use(VueLazyload, {
  loading: imgLoading
}) // 图片懒加载
Vue.use(VueBus)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
