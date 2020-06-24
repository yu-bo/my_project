<template>
    <div>
        <el-row :gutter="5">
            <el-col :span="6">
                <div id="my_up_rate" :style="{ height:'400px'}"></div>
            </el-col>
            <el-col :span="18">
                <div id="my_chart_up" :style="{ height:'400px'}"></div>
            </el-col>
        </el-row>

    </div>
</template>



<script>
    import echarts from 'echarts';
    import bus from '../common/bus';
    export default {
        name: 'StockUp',
        data() {
            return {
                char_up: null,
                up_rate: null
            }
        },
        mounted() {
            this.chartInit();
            this.chartInit_1();
            bus.$on('getUp', target => {
                this.$api.post('/getUpDown', {
                    "stock": target
                }, res => {
                    this.setChartData(res)
                    this.setChartData_1(res)
                })
            });
        },
        methods: {
            chartInit() {
                this.char_up = echarts.init(document.getElementById("my_chart_up"))

                var char_up = this.char_up, up_rate = this.up_rate
                var elementResizeDetectorMaker = require('element-resize-detector')
                // 监听父div的变化
                var erd = elementResizeDetectorMaker();
                erd.listenTo(document.getElementById("my_chart_up"), function (element) {
                    char_up.resize();

                });
                this.char_up.setOption({
                    tooltip: { trigger: 'axis' },
                    legend: {
                        data: ['实际数据', '预测数据', 'bar3', 'bar4'],
                        left: 10
                    },
                });
            },
            /////
            chartInit_1() {
                this.up_rate = echarts.init(document.getElementById("my_up_rate"))
                var up_rate = this.up_rate

                var elementResizeDetectorMaker = require('element-resize-detector')
                // 监听父div的变化
                var erd = elementResizeDetectorMaker();
                erd.listenTo(document.getElementById("my_up_rate"), function (element) {

                    up_rate.resize();
                });
                this.up_rate.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        left: 10,
                        data: ['正确数', '错误数', '联盟广告', '视频广告', '搜索引擎']
                    },
                });
            },
            setChartData(data) {
                //设置 跌涨数据
                var x = data.xAxis, data_1 = data.real_up, data_2 = data.pred_up;
                this.char_up.setOption({
                    xAxis: {
                        data: x,
                        //axisLabel:{rotate:90},
                        splitLine: {
                            show: false,
                            interval: 0,
                        },
                        splitArea: {
                            show: true,
                            interval: 0
                        }
                    },
                    yAxis: {
                        splitLine: {
                            show: false,
                        },
                    },
                    series: [
                        {
                            name: '实际数据',
                            type: 'bar',
                            data: data_1,
                            itemStyle: {
                                label: { show: false },
                                color: '#FF8C00',
                            }
                        },
                        {
                            name: '预测数据',
                            type: 'bar',
                            data: data_2,
                            itemStyle: {
                                label: { show: false },
                                color: '#1E90FF',
                            }
                        },
                    ]
                });
            },
            //////
            setChartData_1(data) {
                //设置跌涨率
                var fit_count = data.fit_count, err_count = data.total_count - data.fit_count
                this.up_rate.setOption({
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['20%', '40%'],
                            label: {
                                formatter: '  {per|{d}%}  ',
                                rich: {
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }

                            },
                            data: [
                                {
                                    value: fit_count,
                                    name: '正确数',
                                    itemStyle: {
                                        label: { show: false },
                                        color: '#32CD32',
                                    }
                                },
                                {
                                    value: err_count,
                                    name: '错误数',
                                    itemStyle: {
                                        label: { show: false },
                                        color: '#FF8C00',
                                    }
                                },

                            ]
                        }
                    ]
                })
            }

        },
    }
</script>