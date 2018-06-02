<template>
  <div class="activity-list">
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="content">
          <ul style="background-color:#FFFFFF;display: flex;flex-flow: column nowrap;">
            <li v-for="item in newsList" :key="item.id" style="" @click="getDetail(item)">
              <div class="li1">
                <div class="info">
                  <p style="margin-bottom:.5rem;" id="title" class="ellipsis">
                    {{item.title}}
                  </p>
                </div>
              </div>
              <div class="li2">
                <p>
                  <span id="time" style="color:#bfbfbf">{{transDate(item.time)}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">

      </mt-tab-container-item>
      <mt-tab-container-item id="4">

      </mt-tab-container-item>
    </mt-tab-container>

    <div class="bottom-bar">
      <mt-tabbar v-model="selected">
        <mt-tab-item id="1">
          <img slot="icon" src="../assets/home.png">
          首页
        </mt-tab-item>
        <mt-tab-item id="2">
          <img slot="icon" src="../assets/newspaper.png">
          新闻
        </mt-tab-item>
        <mt-tab-item id="3">
          <img slot="icon" src="../assets/activity.png">
          我的活动
        </mt-tab-item>
        <mt-tab-item id="4">
          <img slot="icon" src="../assets/my.png">
          个人中心
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <!--底部选项卡-->

  </div>
</template>

<script>
  import {Navbar, TabItem} from 'mint-ui'
  import * as jsonServices from "../services/jsonholder";
  import moment from 'moment'

  export default {
    name: "News",
    data(){
      return {
        selected: '2',
        token: localStorage.getItem('token'),
        newsList: [],
      }
    },
    created(){
      this.getNewsList();
    },
    watch:{
      selected: function(newVal,oldVal){
        if(newVal === '2') {
          this.$router.push({
            name: "News",
          })
        }
        if(newVal === '1') {
          this.$router.push({
            name: "ActivityList",
          })
        }
        if(newVal === '3') {
          this.$router.push({
            name: "MyActivity",
          })
        }
      }
    },
    methods: {
      getNewsList: function() {
        var data = {};
        jsonServices.NewsList(data).then(res => {
          if(res.data.code === 1) {
            if(res.data.result.total > 0) {
              this.newsList = res.data.result.data;

            }
          }
        })
      },
      getDetail: function(item) {
        this.$router.push({
          name: "NewsDetail",
          params: {news: item}
        })
      },

      transDate(date) {
        return moment(date).format("YYYY-MM-DD");
      }
    }
  }
</script>

<style scoped>
  span,p,option,input{
    font-size:1rem;
    color:#4a4a4a;
  }
  .mint-tabbar {
    position:fixed;
    bottom:0;
  }

  .topBar {
    background: #f3f7f9;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    display: flex;
    flex-flow: row;
    justify-content: space-around ;
    align-items: center;
    height:50px;
  }
  .content li {
    padding:.8rem;
    overflow:hidden;
    border-bottom: 1rem solid #F3F7F8
  }
  .info {
    width:100%;
  }
  .li1{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
  .li2{
    margin-top:.5rem;
    display: flex;
    flex-flow: row-reverse;
  }
  #title {
    font-size:1.2rem;
  }
</style>
