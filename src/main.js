import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import ElementUi from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import store from '@/vuex/index.js'

let echarts = require('echarts/lib/echarts')

// 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')
require("echarts/lib/chart/pie");
require("echarts/lib/chart/scatter");

// 引入提示框和title组件，图例
require("echarts/lib/component/toolbox");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/timeline'); //分页组件
require('echarts/lib/component/legendScroll');//图例翻译滚动
require('echarts/lib/component/markLine');//图例翻译滚动
Vue.prototype.$echarts = echarts
Vue.use(ElementUi);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
