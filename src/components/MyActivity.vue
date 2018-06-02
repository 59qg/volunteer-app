<template>
  <div class="my-Activity">

    <!--底部选项卡-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="3">
        <div class="topBar">
          <mt-navbar v-model="typed" style="display: flex;width:100%;height:55px">
            <mt-tab-item id="5" style="width:50%;"><span style="font-size:1.2rem">我的报名</span></mt-tab-item>
            <mt-tab-item id="6" style="width:50%;"><span style="font-size:1.2rem">我的收藏</span></mt-tab-item>
          </mt-navbar>
        </div>
        <mt-tab-container v-model="typed">
          <mt-tab-container-item id="6">
            <div class="content">
              <ul style="background-color:#FFFFFF;display: flex;flex-flow: column nowrap;">
                <li v-for="item in enrollList" :key="item.id" style="" @click="getDetail(item)">
                  <div class="li1">
                    <div class="imgContent">
                      <img :src="item.img">
                    </div>
                    <div class="info">
                      <p style="margin-bottom:.5rem;" id="title" class="ellipsis">
                        {{item.title}}
                      </p>
                    </div>
                  </div>
                  <div class="li2">
                    <p>
                      <span style="color:#bfbfbf">活动时间：</span>
                      <span id="time">{{transDate(item.time)}}</span>
                    </p>
                    <p>
                      <span id="state" style="color:#0f559a">{{renderState(item.status)}}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">

      </mt-tab-container-item>
      <mt-tab-container-item id="1">

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
    name: "MyActivity",
    data(){
      return {
        selected: '3',
        typed: '6',
        token: localStorage.getItem('token'),
        enrollList: [],
        collectList: [],
      }
    },
    created(){
      this.getEnrollList();
    },
    watch:{
      selected: function(newVal,oldVal) {
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
      },

    },
    methods: {
      getEnrollList: function() {
        var data = {};
        data.token = this.token;
        jsonServices.UserEnroll(data).then(res => {
          if(res.data.code === 1) {
            if(res.data.result.length > 0) {
              var list1 = [];
              for(let a in res.data.result) {
                jsonServices.ActivityDetail({id: res.data.result[a].activity_id}).then(rest => {
                  if(rest.data.code === 1) {
                    list1.push(rest.data.result);
                    if(list1.length === res.data.result.length){
                      this.enrollList = list1;
                    }
                  }
                })
              }
            }
          }
        })
      },
      getDetail: function(item) {
        this.$router.push({
          name: "MyActivityDetail",
          params: {activity: item}
        })
      },

      renderState(n) {
        if(n === 2) {
          return '招募中';
        }
      },
      transDate(date) {
        return moment(date).format("YYYY-MM-DD hh:mm:ss");
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
    height:60px;
  }
  .content {
    margin-top:60px;
  }
  .content li {
    border-bottom: 1rem solid #F3F7F8;
    padding:.5rem;
    overflow:hidden;
  }
  .imgContent {
    width:3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border:1px solid #333;
  }
  .imgContent img {
    width:3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }
  .info {
    width:75%;
  }
  .li1,.li2 {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding:.5rem;
  }
  .li1 {
    border-bottom: 1px solid #f8f8f8;
    /*border-top:5px solid #f8f8f8;*/
    margin-top:.5rem;
  }
  #title {
    font-size:1.3rem;
  }
  .mint-tab-item-label {
    font-size:1.2rem !important;
  }
</style>
