<template>
  <div>
    <div id="my_chart" :style="{ height:'400px'}"></div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import bus from '../common/bus';
  export default {

    name: 'StockAnalyze',
    data() {
      return {
        msg: 'StockInfo',
        stockInfo: {},
        values: [],
        my_chart: null,
      }
    },
   
    mounted() {
      this.chartInit();
      bus.$on('getChart', target => {
        this.$api.post('/getTestData', {
          "stock": target
        }, res => {
          this.setChartData(res)
        })
      });
    },
    methods: {

      chartInit() {
        this.my_chart = echarts.init(document.getElementById('my_chart'));

        var mychart = this.my_chart;

        var elementResizeDetectorMaker = require('element-resize-detector')
        // 监听父div的变化
        var erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById("my_chart"), function (element) {
          mychart.resize();
        })
        /*
        window.addEventListener("resize", function () {
           mychart.resize();
         });*/

        this.my_chart.setOption({
          title: { text: '曲线分析图', left: 'center', textStyle: { color: '#333' } },
          tooltip: { trigger: 'axis' },
          legend: {
            left: "auto",

          },

        });
      },

      setChartData(data) {
        var data_1 = data.realData, data_2 = data.predictData, x = data.xAxis;
        //console.log(data)
        this.my_chart.setOption({
          xAxis: {
            type: 'category',
            scale: true,
            data: x,
            boundaryGap: false
          },
          yAxis: {
            type: 'value',
            scale: true,
          },
          series: [{
            name: '实际曲线',
            type: 'line',
            data: data_1,
            itemStyle: {
              normal: {
                label: { show: false },
                color: '#FF8C00',
                lineStyle: { color: '#FF8C00' }
              }
            }
          }, {
            name: '预测曲线',
            type: 'line',
            data: data_2,
            itemStyle: {
              normal: {
                label: { show: false },
                color: '#1E90FF',
                lineStyle: { color: '#1E90FF' }
              }
            }
          }]
        });
      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span.data {
    font-weight: 800;
    color: rgb(0, 26, 255);
  }

  #my_chart {}
</style>