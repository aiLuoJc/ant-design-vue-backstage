<template>
  <div style="text-align:center">
    <IconFont type="icon-icon-404" style="font-size:100px" />
    <!-- <img :src="add" alt=""> -->
    <add />
  </div>
</template>

<script>
/**
 * 导进来的文件是一个 url的字符串，可以直接用 img标签使用
 * 因为cli内部配置了一个 .svg的loader，fileloader会处理成URL链接
 */
//
/**
 * 由于在config.js配置了 chainWebpack，
 * 那 add 返回的不是字符串了而是 函数式组件
 */
import add from "@/assets/add.svg";
export default {
  // data() {
  //   return {
  //     add
  //   }
  // }
  components: {
    add
  }
};
</script>

<style></style>
