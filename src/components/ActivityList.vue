<template>
  <div class="activity-list">

    <!--底部选项卡-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="topBar">
          <div>
            <span>区域</span>
            <select name="select" id="countySelect" v-model="selectCounty" @change="getCommunityData">
              <option v-for="county in countyList" :key="county.id" :value="county.name">{{county.name}}</option>
            </select>
          </div>
          <div class="input-area">
            <input type="search" placeholder="关键字" id="searchInput" v-model="searchKey">
            <i class="fa fa-search" @click="getActivityList"></i>
          </div>
        </div>
        <div class="content">
          <ul style="background-color:#FFFFFF;display: flex;flex-flow: column nowrap;">
            <li v-for="item in activityList" :key="item.id" style="" @click="getDetail(item)">
              <div class="li1">
                <div class="imgContent">
                  <img :src="item.img">
                </div>
                <div class="info">
                  <p style="margin-bottom:.5rem;" id="title" class="ellipsis">
                    {{item.title}}
                  </p>
                  <p>
                    <span style="color:#bfbfbf">招募人数/报名人数：</span>
                    <span>{{item.recruitment}}人/{{item.enrollNum}}人</span>
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
      <mt-tab-container-item id="2">

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
    name: "ActivityList",
    data(){
      return {
        selected: '1',
        token: localStorage.getItem('token'),
        selectCounty: '',
        searchKey: '',
        activityList: [],
        countyList: [
          {
            name: '不限',
            jc: 'bx',
            id: 0,
          },
          {
          name:'武侯区',
          jc: 'WHQ',
          id: 1
        },{
          name:'锦江区',
          jc: 'JJQ',
          id: 2
        },{
          name:'青羊区',
          jc: 'QYQ',
          id: 3
        },{
          name:'金牛区',
          jc: 'JNQ',
          id: 4
        },{
          name:'成华区',
          jc: 'CHQ',
          id: 5
        },{
          name:'龙泉驿区',
          jc: 'LQYQ',
          id: 6
        },{
          name:'青白江区',
          jc: 'QBJQ',
          id: 7
        },{
          name:'新都区',
          jc: 'XDQ',
          id: 8
        },{
          name:'温江区',
          jc: 'WJQ',
          id: 9
        },{
          name:'双流区',
          jc: 'SLQ',
          id: 10
        },{
          name:'金堂县',
          jc: 'JTX',
          id: 11
        },{
          name:'郫县',
          jc: 'PX',
          id: 12
        },{
          name:'大邑县',
          jc: 'DYX',
          id: 13
        },{
          name:'蒲江县',
          jc: 'PJX',
          id: 14
        },{
          name:'新津县',
          jc: 'XJX',
          id: 15
        },{
          name:'都江堰市',
          jc: 'DJYS',
          id: 16
        },{
          name:'彭州市',
          jc: 'PZS',
          id: 17
        },{
          name:'邛崃市',
          jc: 'QLS',
          id: 18
        },{
          name:'崇州市',
          jc: 'CZS',
          id: 19
        },{
          name:'简阳市',
          jc: 'JYS',
          id: 20
        }],
      }
    },
    created(){
      this.getActivityList();
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
        if(newVal === '4') {
          this.$router.push({
            name: "MyInfo",
          })
        }
      },
      selectCounty: function(newVal, oldVal) {
        this.getActivityList();
      },
      searchKey: function(newVal, oldVal) {
        this.getActivityList();
      }
    },
    methods: {
      getActivityList: function() {
        var data = {};
        data.county = this.selectCounty;
        if(data.county === '不限') {
          data.county = '';
        }
        data.title = this.searchKey;
        jsonServices.ActivityList(data).then(res => {
          if(res.data.code === 1) {
            this.activityList = res.data.result.data;
          }
        })
      },
      getDetail: function(item) {
        this.$router.push({
          name: "ActivityDetail",
          params: {activity: item}
        })
      },

      renderState(n) {
        if(n === 2) {
          return '招募中';
        }
        if(n === 3) {
          return '开展中';
        }
        if(n === 4) {
          return '已经结束';
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
</style>
