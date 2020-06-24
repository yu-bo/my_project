<template>
    <div>

        <el-table :data="values" style="width: 100%">

            <el-table-column v-for="(item, index) in headers" :key="index" :prop="item.key" :label="item.title">
            </el-table-column>

        </el-table>
    </div>
</template>
<script>

    export default {
        name: "StockInfo",
        data() {
            return {
                headers: [],
                values: []
            }
        },

        mounted() {
            var stockInfo = this.$_global.stockInfo;
            if (stockInfo != null) {
                this.$api.post("/getPredictData", {
                    "stock": stockInfo
                }, res => {
                    var title = res.header, key = res.index, values = res.data
                    for (var i in title) {
                        var item = {
                            title: title[i],
                            key: key[i]
                        }
                        this.headers.push(item)
                    }
                   
                    for (var i in values){
                        var value = values[i],item={}
                        for(var j in value){
                              item[key[j]]= value[j]
                        }
                        this.values.push(item)
                    }
                    console.log(this.values)

                })
            }
        }

    }
</script>