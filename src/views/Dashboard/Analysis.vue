<template>
  <div>
    <chart :option="chartOption" style="height:400px"></chart>
  </div>
</template>

<script>
// import axios from "axios";
import request from "@/utils/request";
import Chart from "@/components/Chart";
export default {
  data() {
    return {
      chartOption: {}
      // interval: null
    };
  },
  components: {
    Chart
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { ID: 123456 }
      }).then(response => {
        this.chartOption = {
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
              data: response.data
            }
          ]
        };
      });
    }
  },
  mounted() {
    this.getChartData();
    // this.interval = setInterval(() => {
    //   this.getChartData()
    // }, 3000);
  },
  beforeDestroy() {
    // clearInterval(this.interval);
  }
};
</script>
<style></style>
