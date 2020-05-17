<template>
  <div>
    <chart :option="chartOption" style="height:400px"></chart>
  </div>
</template>

<script>
import random from "lodash/random"; // 随机数
import Chart from "@/components/Chart";
export default {
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      interval: null
    };
  },
  components: {
    Chart
  },
  mounted() {
    this.interval = setInterval(() => {
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100) // 产生100 的随机数 来动态改变echarts 图的数据
      );
      this.chartOption = { ...this.chartOption }; //浅拷贝重新生成一个新值，这样就能对内部修改后，子组件也能监听到
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
<style></style>
