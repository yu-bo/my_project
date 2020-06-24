<template>
  <div class="hello">
    <h3>{{ stockInfo.name}}</h3>

    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in values" :key="index">
        <div style="text-align: left;" class="grid-content bg-purple">
          <span class="name"> {{item[0]}}</span>:
          <span class="data"> {{item[1]}}</span>

        </div>
      </el-col>

    </el-row>
  
    
    <div id="my_chart" :style="{width: '100%', height:'500px'}"></div>
    <!-- <el-table :data="values" style="width: 100%">

      <el-table-column v-for="(item, index) in headers" :key="index" :prop="item.key" :label="item.title">
      </el-table-column>

    </el-table> -->
  </div>
</template>

<script>

  import echarts from 'echarts'

  export default {
    name: 'StockAnalyze',
    data() {
      return {
        msg: 'StockInfo',
        stockInfo: {},
        values: [],
        my_chart: null
      }
    },
    mounted() {
      this.stockInfo = this.$_global.stockInfo;

      if (this.stockInfo != null) {
        this.getStockInfo();
        this.chartInit()

        this.$api.post('/getTestData', {
          "stock": this.stockInfo
        }, res => {
          this.setChartData(res)
        })
      };


    },
    methods: {
      getStockInfo() {
        this.$api.post('/getStockInfo', {
          "stock": this.stockInfo
        }, res => {
          this.values = []
          if (res == "") return;
          for (var key in res[0]) {
            this.values.push(res[0][key].split(":"))
          }
          console.log(this.values)
        });
      },


      chartInit() {
        this.my_chart = echarts.init(document.getElementById('my_chart'));
        var mychart = this.my_chart;

        window.addEventListener("resize", function () {
          mychart.resize();
        });
        this.my_chart.setOption({
          title: { text: '曲线分析图',left:'center' },
          tooltip: { trigger: 'axis' },
          legend: {
            left:"left",
            data: ['实际曲线', '预测曲线', '视频广告', '直接访问', '搜索引擎']
          },
          xAxis: {},
          yAxis: {},
        });
      },

      setChartData(data) {
        let data_1 = data.realData, data_2 = data.predictData, x = data.xAxis;
        console.log(data)
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
            itemStyle: { normal: { label: { show: true } } }
          }, {
            name: '预测曲线',
            type: 'line',
            data: data_2,
            itemStyle: { normal: {
                label: { show: true },
                color: '#001AFF',
                lineStyle: { color: '#001AFF'  }} 
            }
          }]
        });
      }

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span.data {
    font-weight: 800;
    color:rgb(0, 26, 255);
  }
  #my_chart{
    padding-top:2em;
  }
</style>