<template>
    <div>
        <el-card :body-style="{ padding: '0px' }">
            <div slot="header">
                <span>用户</span>
                <el-button type="primary" @click="call(1001)">呼叫</el-button>
            </div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="demo-color-box">
                            <el-row>
                                <el-col :span="12">
                                    <el-avatar> 1000 </el-avatar>
                                </el-col>
                                <el-col :span="12">
                                    <div class="state-box">
                                     
                                    </div>

                                </el-col>
                            </el-row>
                            <div class="bg-color-sub">

                                <div class="bg-success-sub-item">
                                    <el-button type="primary" @click="call(1001)">呼叫</el-button>
                                    <el-button type="primary" @click="hangup(1001)">挂断</el-button>
                                </div>
                            </div>
                        </div>


                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="demo-color-box">
                            <el-col :span="12">
                                <el-avatar> 1001 </el-avatar>
                            </el-col>
                            <el-col :span="12">
                                <div class="state-box">
                                   {{user1_state}}
                                </div>

                            </el-col>
                            <div class="bg-color-sub">
                                <div class="bg-success-sub-item">
                                    <el-button type="primary" @click="call(1001)">呼叫</el-button>
                                    <el-button type="primary" @click="hangup(1001)">挂断</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="demo-color-box">
                            <el-col :span="12">
                                <el-avatar> 1002 </el-avatar>
                            </el-col>
                            <el-col :span="12">
                                <div class="state-box">
                                   {{user2_state}}
                                </div>

                            </el-col>
                            <div class="bg-color-sub">
                                <div class="bg-success-sub-item">
                                    <el-button type="primary" @click="call(1002)">呼叫</el-button>
                                    <el-button type="primary" @click="hangup(1002)">挂断</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>

            </el-row>
        </el-card>
        <el-card :body-style="{ padding: '0px' }">
            <div slot="header">
                <span>测试</span>
            </div>
            <!-- card body -->
            <el-row>
                <el-col :span="6">
                    <el-input v-model="user_1" placeholder="请输入内容"></el-input>
                    <el-input v-model="user_2" placeholder="请输入内容"></el-input>
                    <div>
                        <el-button type="primary" @click="brige">链接</el-button>
                        <el-button type="primary" @click="brige_new">呼叫</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card :body-style="{ padding: '0px' }">
            <div slot="header">
                <span>测试</span>
            </div>
            <!-- card body -->
            <el-row>
                <el-col :span="20">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                    <el-button type="primary" @click="rpcClick">主要按钮</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                input: "",
                user_1: "",
                user_2: "",
                user1_state:"",
                user2_state:"",
                websock: null,
            }
        },
        created(){
            //页面刚进入时开启长连接
             this.initWebSocket()
        },
        destroyed: function() {
        　//页面销毁时关闭长连接
 　　　　　　this.websocketclose();
 　　　　},
        methods: {
            rpcClick() {
                console.log("rpcClick")
                this.$api.post("/rpc", {
                    "name": this.input
                }, res => {
                    console.log(res)
                })
            },
            call(value) {
                console.log("call:" + value);
                this.$api.post("/call", {
                    "call_id": String(value)
                }, res => {
                    console.log(res)
                })
            },
            hangup(value) {
                console.log("hangup:" + value);
                this.$api.post("/hangup", {
                    "hangup_id": String(value)
                }, res => {
                    console.log(res)
                })
            },
            brige() {
                console.log("bridge:" + this.user_1 + "<->" + this.user_2);
                this.$api.post("/bridge", {
                    "user_1": String(this.user_1),
                    "user_2": String(this.user_2)
                }, res => {
                    console.log(res)
                })
            },
            brige_new() {
                console.log("bridge_new:" + this.user_1 + "<->" + this.user_2);
                this.$api.post("/bridge_new", {
                    "user_1": String(this.user_1),
                    "user_2": String(this.user_2)
                }, res => {
                    console.log(res)
                })
            },
            initWebSocket() { //初始化weosocket 
                const wsuri = "ws://localhost:8080" + "/imserver/callState";//ws地址
                this.websock = new WebSocket(wsuri);
                this.websock.onopen = this.websocketonopen;

                this.websock.onerror = this.websocketonerror;

                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen() {
                console.log("WebSocket连接成功");
            },
            websocketonerror(e) { //错误
                console.log(e);
                console.log("WebSocket连接发生错误");
            },
            websocketonmessage(e) { //数据接收 
                const redata = JSON.parse(e.data);
                if(redata.user=="1001"){
                    this.user1_state=redata.state
                }

                if(redata.user=="1002"){
                    this.user2_state=redata.state
                }
                // 接收数据
                console.log(redata);
            },

            websocketsend(agentData) {//数据发送 
                this.websock.send(agentData);
            },

            websocketclose(e) { //关闭 
                console.log("connection closed (" + e.code + ")");
            },
        },
    }
</script>
<style scoped>
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .demo-color-box {
        position: relative;
        border-radius: 4px;
        padding: 20px;
        margin: 5px 0;
        height: 114px;
        box-sizing: border-box;
        color: #fff;
        font-size: 14px;
    }

    .demo-color-box .value {
        font-size: 12px;
        opacity: .69;
        line-height: 24px;
    }

    .bg-color-sub {
        width: 100%;
        height: 40px;
        left: 0;
        bottom: 0;
        position: absolute;
    }

    .bg-success-sub-item:first-child {
        border-radius: 0 0 0 4px;
    }

    .bg-success-sub-item {
        width: 50%;
        height: 100%;
        display: inline-block;
    }

    .state-box {
        position: relative;
        border-radius: 4px;
        padding: 15px;
        margin: 5px 0;
        height: 64px;
        box-sizing: border-box;
        color: #fff;
        font-size: 20px;
        background-color: darkgray;
    }
</style>