<template>
  <div id="app">
    <!-- <a-button>按钮</a-button>
    <div id="nav">
      <router-link to="/dashboard/analysis">dashboard</router-link>|
      <router-link to="/form">form</router-link>
    </div> -->
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
// 由于日历组件、日期组件使用的是 moment的库，
// moment库里面也有自己的语言库，所有需要将moment引入进来
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      locale: zhCN
    };
  },
  watch: {
    // 监听路由上的 query， 动态改变 locale
    "$route.query.locale": function(val) {
      this.locale = val === "enUS" ? enUS : zhCN;
      // 日历组件等的设置
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    }
  }
};
</script>
<style lang="less"></style>
