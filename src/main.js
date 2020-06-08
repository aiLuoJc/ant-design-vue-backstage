import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// import { Button } from 'ant-design-vue';
import "ant-design-vue/dist/antd.less";
import antd from "ant-design-vue";
// import {Button, Layout, Icon, Drawer, Radio, Menu} from "ant-design-vue"
import { Icon } from "ant-design-vue";
import Authorized from "@/components/Authorized"; // 权限组件模块  在BasicLayout使用了
import Auth from "@/directives/auth"; // 权限指令js 在BasicLayout使用了 v-auth="['admin']"

Vue.config.productionTip = false;

// Vue.use(Button);
// Vue.use(Layout);
Vue.use(Icon);
// Vue.use(Drawer);
// Vue.use(Radio);
// Vue.use(Menu);
Vue.use(antd);

Vue.component("Authorized", Authorized);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1871669_6nj3n88rrlu.js" // 在 iconfont.cn 上生成
});

Vue.component("IconFont", IconFont);
Vue.use(Auth);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
