<template>
  <div class="header">
    <!-- <notice-icon-view /> -->
    <a-dropdown>
      <a-icon type="global" />
      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN">
          中文
        </a-menu-item>
        <a-menu-item key="enUS">
          English
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
// import NoticeIconView from "@/components/GlobalHeader/NoticeIconView";
export default {
  // components: { NoticeIconView },
  methods: {
    localeChange({ key }) {
      // 切换路由，将配置的语言拼接到路由上
      this.$router.push({ query: { ...this.$route.query, locale: key } });
      // 路由改变的时候切换
      this.$i18n.locale = key;
    }
  }
};
</script>

<style scoped>
.header {
  float: right;
  margin-right: 30px;
}
</style>
