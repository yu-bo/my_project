<template>
    <div>
        <div>JSsip</div>
        <el-row>
            <el-col :span="12">
                <el-button type="primary" @click=wsInit()>创建wss链接</el-button>
                <el-button type="primary" @click=wsCall()>打个电话</el-button>
            </el-col>
            <el-col :span="12">
                <audio id="remoteAudio" controls>
                    <p>Your browser doesn't support HTML5 audio.</p>
                </audio>
               
                <video id="localVideo" muted="muted"></video>
                <audio id="audio" src autoplay/>
          
            </el-col>
        </el-row>
    </div>
</template>
<script >
    var JsSIP = require('jssip')
  
  
    export default {
        name: "JSsip",
        data() {
            return {
                coolPhone: null,

            }
        },
        methods: {
            
            wsInit() {
                console.log(Web)
                var socket = new JsSIP.WebSocketInterface('wss://192.168.8.129:7443');
                var configuration = {
                    sockets: [socket],
                    uri: 'sip:1001@192.168.8.129',
                    password: '1234'
                };

                this.coolPhone = new JsSIP.UA(configuration);

                this.coolPhone.on('connected', function (e) {
                    /* Your code here */
                    console.log("connected")
                });

                this.coolPhone.on('disconnected', function (e) {
                    /* Your code here */
                    console.log("disconnected")
                });

                this.coolPhone.on('registered', function (e) {
                    /* Your code here */
                    console.log("registered")
                    console.log(e)
                });
                this.coolPhone.on('unregistered', function (e) {
                    /* Your code here */
                    console.log("unregistered")
                });
                this.coolPhone.on('registrationFailed', function (e) {
                    /* Your code here */
                    console.log("registrationFailed")
                });


                this.coolPhone.on('newRTCSession', function (e) {
                    /* Your code here */
                    console.log("registrationFailed")
                });
                this.coolPhone.on('newMessage', function (e) {
                    /* Your code here */
                    console.log("registrationFailed")
                });
                this.coolPhone.start()

            },

            wsCall() {
                // Register callbacks to desired call events
                var eventHandlers = {
                    'progress': function (e) {
                        console.log('call is in progress');
                    },
                    'failed': function (e) {
                        console.log('call failed with cause: ');
                        console.log(e)
                    },
                    'ended': function (e) {
                        console.log('call ended with cause: ' + e);
                    },
                    'confirmed': function (e) {
                        console.log('call confirmed');
                    }
                };

                var options = {
                    'eventHandlers': eventHandlers,
                    'mediaConstraints': { 'audio': true, 'video': true }
                };

                var session = this.coolPhone.call('sip:1002@192.168.8.129', options);
            }
        },
    }
</script>