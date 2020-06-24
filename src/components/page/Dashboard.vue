<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:547px;">
                    <v-StockSearch></v-StockSearch>
                </el-card>
            </el-col>
            <el-col :span="16">
                <v-StockEvaluate></v-StockEvaluate>
                
                <el-card shadow="hover" style="height:425px;">
                    <v-StockChart></v-StockChart>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card :body-style="{ padding: '0px' }" style="height: 500px;">
                    <div slot="header">
                        <span>跌涨信息</span>
                    </div>
                    <v-StockUp></v-StockUp>
                </el-card>
                
               <v-StockUp></v-StockUp>
            </el-col>
           
        </el-row>
       
    </div>
</template>

<script>
import bus from '../common/bus';
import VStockSearch from './StockSearch.vue';
import VStockChart from './StockChart.vue';
import VStockEvaluate from './StockEvaluate.vue';
import VStockUp from './StockUp.vue'
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
        };
    },
    mounted() {
       //设置请求失败的提示函数对
        this.$api.f_alert(this.$message.error)     
    },
    components: {
        VStockSearch,
        VStockChart,
        VStockEvaluate,
        VStockUp
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
   
    methods: {
      
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}


</style>
