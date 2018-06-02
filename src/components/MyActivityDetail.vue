<template>
  <div class="my-activity-detail">

    <mt-header fixed title="志愿服务活动" style="height:60px; font-size:1rem; background:#f3f7f9; color:#4a4a4a;">
      <router-link to="/my-activity" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="info" style="margin-top:60px;">
      <div class="content">
        <div class="row">
          <div id="title" style="text-align: center;line-height: 2rem;">
            <p style="font-size:1.5rem;">{{activity.title}}</p>
          </div>
        </div>
      </div>
      <div class="content" >
        <div class="row" id="info1" style="padding:.5rem;">
          <p>
            <span style="color:#9b9b9b">发起组织：</span>
            <span>{{activity.group}}</span>
          </p>
          <p>
            <span style="color:#9b9b9b">联系人：</span>
            <span>{{activity.user}}</span>
          </p>
          <p>
            <span style="color:#9b9b9b">联系电话：</span>
            <span>{{activity.phone}}</span>
          </p>
          <p>
            <span style="color:#9b9b9b">活动地点：</span>
            <span>{{activity.address}}</span>
          </p>
          <p>
            <span style="color:#9b9b9b">活动时长：</span>
            <span>{{activity.duration}}</span>
          </p>
          <p>
            <span style="color:#9b9b9b">招募截至：</span>
            <span>{{transDate(activity.recruit_time)}}</span>
          </p>
          <p>
            <span style="color:#9b9b9b">活动开始：</span>
            <span>{{transDate(activity.time)}}</span>
          </p>
          <p>
            <span style="color:#9b9b9b">招募人数：</span>
            <span>{{activity.recruitment}}人</span>
          </p>
          <p>
            <span style="color:#9b9b9b">已招募人数：</span>
            <span>{{activity.recruited}}人</span>
          </p>
        </div>
      </div>
      <div class="content" >
        <div class="row" id="info2">
          <p>
            <span style="color:#9b9b9b">活动内容：</span>
          </p>
          <p>
            <span>{{activity.content}}</span>
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row" id="info3">
          <p>
            <span style="color:#9b9b9b">岗位要求：</span>
          </p>
          <p>
            <span>{{activity.require}}</span>
          </p>
        </div>
      </div>
      <div class="content">
        <div class="row" id="info4">
          <p>
            <span style="color:#9b9b9b">报名情况：</span>
          </p>
          <table  v-show="activity.enrollNum">
            <tr>
              <td style="width:20%; color:red;">姓名</td>
              <td style="width:10%; color:red;">性别</td>
              <td style="width:40%; color:red">报名时间</td>
              <td style="width:20%; color:red">审核状态</td>
            </tr>
            <tr v-for="it in activity.enroll" :key="it.id">
              <td>{{it.user}}</td>
              <td>{{transGender(it.user_gender)}}</td>
              <td>{{transDate(it.enroll_time)}}</td>
              <td>{{renderState(it.status)}}</td>
            </tr>
          </table>
          <p v-show="!activity.enrollNum">
            <span>暂无人报名</span>
          </p>

        </div>
      </div>
    </div>
    <div class="buttom-btn">
      <button @click="collectActivity()"  v-show="!myCollect" class="buttonClass" style="background-color:#FF9800;color:#FFFFFF">收藏</button>
      <button @click="unCollectActivity()" v-show="myCollect" class="buttonClass" style="background-color:#FFFFFF;color:#FF9800;">取消收藏</button>
      <button @click="enrollActivity()"  v-show="!myEnroll" class="buttonClass" style="background-color:#FF9800;color:#FFFFFF">报名</button>
      <button @click="unEnrollActivity()" v-show="myEnroll" class="buttonClass" style="background-color:#FFFFFF;color:#FF9800;">取消报名</button>

    </div>


  </div>
</template>

<script>
  import {Navbar, TabItem} from 'mint-ui'
  import {Header } from 'mint-ui'
  import * as jsonServices from "../services/jsonholder";
  import moment from 'moment'

  export default {
    name: "MyActivityDetail",
    data(){
      return {
        token: localStorage.getItem('token'),
        activity: '',
        myEnroll: false,
        myCollect: false,
      }
    },
    created(){
      this.getEnroll();
      this.getEnrollStatus();
    },
    watch:{
    },
    methods: {
      getEnroll() {
        this.$route.params.activity.recruited = 0;
        jsonServices.ActivityEnroll({activity_id: this.$route.params.activity.id}).then(rest => {
          if(rest.data.code === 1) {
            this.$route.params.activity.enrollNum = rest.data.result.length;
            this.$route.params.activity.enroll = rest.data.result;
            if(rest.data.result.status === 1){
              this.$route.params.activity.recruited ++;
            }
            this.enrollList = this.$route.params.activity;
          }
        })
      },
      enrollActivity() {
        jsonServices.EnrollActivity({token:this.token, activity_id:this.activity.id}).then(res => {
          if(res.data.code === 1) {
            if(res.data.msg === 'success'){
              this.myEnroll = true;
              this.getEnrollStatus();
            }
          }
        })
      },

      getEnrollStatus() {
        jsonServices.UserEnroll({token:this.token, activity_id:this.activity.id}).then(res => {
          if(res.data.code == 1) {
            if(res.data.result.length > 0){
              this.myEnroll = true;
            }

          }
        })
      },

      renderState(n) {
        if(n === 0) {
          return '审核中';
        }
        if(n === 1) {
          return '已通过';
        }
        if(n === 2) {
          return '已拒绝';
        }
      },
      transDate(date) {
        return moment(date).format("YYYY-MM-DD hh:mm:ss");
      },
      transGender(n) {
        if(n === 1) {
          return '男';
        }
        if(n === 2) {
          return '女';
        }
      }
    }
  }
</script>

<style scoped>
  span,p,option,input{
    font-size:1rem;
    color:#4a4a4a;
  }
  .content {
    margin:.8rem 1rem;
  }
  #info1 p,#info2 p,#info3 p,#info4 {
    margin:.3rem 0;
  }
  h1 {
    font-size:1.2rem !important;
  }
  .buttom-btn {
    position: fixed;
    bottom:0;
    width:100%;
    display: flex;
  }
  .buttom-btn button {
    width:50%;height:40px; font-size: 1.4rem;
  }

  td{
    text-align: center;
  }

</style>
