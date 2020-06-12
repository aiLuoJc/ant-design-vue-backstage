<template>
  <div ref="chartDom"></div>
</template>

<script>
// 全部引入
// import echarts from "echarts";

// 按需引入
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";

import { addListener, removeListener } from "resize-detector"; // 通过这个解决DOM加载异步问题
import debounce from "lodash/debounce"; // 通过这个来进行防抖
export default {
  props: {
    option: {
      // 接收父组件传过来的配置文件
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      /**
       * 问题： 由于普通监听不能检测到 内部数据变化，所以需要使用到深度监听，
       * 但是深度监听会带来很大的性能问题，我们采用普通监听（下面方法）
       *
       * 解决：使用普通的监听事件，在父组件处理好数据的时候 手动更改一下 option，
       * 让值变成一个新值，这样内部数据变化也会监听到
       *      在父组件 处理数据后 this.chartOption = {...this.chartOption}
       *
       */
      this.chart.setOption(val);
    }
    // 深度监听非常消耗性能，对数据多的 不推荐使用
    // option: {
    //   // 深度监听父组件的 option变化，当前组件实现实时渲染
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300); // 解决窗口在变化时多次触发 resize，防抖事件
  },
  mounted() {
    this.renderChart(); // 渲染ecahrts
    addListener(this.$refs.chartDom, this.resize);
  },
  methods: {
    resize() {
      //窗口变动时，重新加载chart
      this.chart.resize();
    },
    // 封装渲染的 echarts
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize); // 销毁组件
    this.chart.dispose(); // 销毁 chart 实例，防止内存泄漏
    this.chart = null;
  }
};
</script>

<style></style>
