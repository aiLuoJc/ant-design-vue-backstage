import Vue from "vue";
// 自己组件配置国际化，下载 VueI18n插件
import VueI18n from "vue-i18n";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import queryString from "query-string"; // 解析url库

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
Vue.use(VueI18n);

Vue.component("Authorized", Authorized);

const i18n = new VueI18n({
  // 通过url中取，用 第三方库queryString 解析url
  // location.search 本身是一个字符串，解析成对象，取出locale值
  locale: queryString.parse(location.search).locale || "zhCN",
  // 配置语言包
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1871669_6nj3n88rrlu.js" // 在 iconfont.cn 上生成
});

Vue.component("IconFont", IconFont);
Vue.use(Auth);
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
