<template>
    <div>
        <el-row>
            <el-col :span="12">
              <el-input class="handle-input" v-model="input" @input="findStock(input)" placeholder="请输入内容">
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </el-col>
          </el-row>
      
        <div class="infinite-list-wrapper" style="overflow:auto">
            <ul
              class="infinite-list"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="disabled">
              <li v-for="item in showData" @click=getName(item) class="list-item">{{ item.name + " " + item.symbol }}</li>
            </ul>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
          </div>
    </div>
 
  </template>
  
  <script>
    export default {
      data () {
        return {
            msg: 'Welcome to stock home',
            stock_list: [],
            input: "",
            count: 0,
            loading: false,
            totalCount: 0,
            showData: []
        }
      },
      mounted() {
        this.$api.get('/getList', {
        }, res => {
          this.stock_list = res
          //totalCount 控制这滚动条的加载
          this.totalCount = this.stock_list.length
          console.log(this.stock_list)
        });
      },
      computed: {
        noMore () {
          return this.count >= this.totalCount
        },
        disabled () {
          return this.loading || this.noMore
        }
      },
      methods: {
        loadMore () {
          this.loading = true
          setTimeout(() => {
            this.count += 10
            this.count >= this.totalCount ? this.count = this.totalCount : {}
            this.showData = this.stock_list.slice(0, this.count)
            console.log(this.showData)
            this.loading = false
          }, 100)
        },
        /////
        findStock(input) {
            ///输入匹配
            input = input.replace(/(^\s*)|(\s*$)/g, "")//去掉前后空格
            if (input == "" || input.length < 2) {
              this.showData = this.stock_list
              return
            }
            this.showData = []
            this.stock_list.forEach((item, index) => {
              if (item.name.indexOf(input) != -1 || item.symbol.indexOf(input) == 0) {
                this.showData.push(item)
              }
            })
            //console.log(this.showData.length)
          },
          /////
          getName(item) {
            this.input = item.name + " " + item.symbol;
            this.$_global.stockInfo = item
            //console.log(this.$_global)
          },
          ////
          handleSearch() {
            this.$router.push('/analyze')
          }
      }
    }
  </script>
  <style scoped>
    h1,
    h2 {
      font-weight: normal;
    }
  
    .handle-input {
      width: 250px;
      display: inline-block;
    }
  
    .infinite-list-wrapper {
      height: 320px;
    }
  
    .infinite-list-wrapper .infinite-list {
      padding: 0px;
      margin: 0px;
      list-style: none;
    }
  
    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    }
  
    .infinite-list-wrapper .list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #e8f3fe;
      color: #7dbcfc;
    }
  
    .infinite-list-wrapper .list-item+.list-item {
      margin-top: 10px;
    }
  
    .infinite-list-wrapper p {
      height: 30px;
      margin-block-end: 0;
      margin-block-start: 0;
    }
  </style>