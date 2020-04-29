<template>
  <div>
    <div class="desc">BasicLayout</div>
    <Header />
    <SiderMenu />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SiderMenu from "@/layouts/SiderMenu";
export default {
  components: {
    Header,
    Footer,
    SiderMenu
  }
};
</script>

<style></style>
