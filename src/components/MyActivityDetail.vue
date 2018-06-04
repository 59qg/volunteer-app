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

      <div class="content">
        <div class="row" id="info5">
          <p>
            <span style="color:#9b9b9b">最新评论：</span>
          </p>
          <div v-show="isComment">
            <div v-for="sit in newComment" style="border-bottom: 1px solid #F3F7F8" @click="showComment">
              <p>{{sit.user}}</p>
              <p>
                  <span v-for="n in 5">
                    <i v-if="n <= sit.star" style="font-size: .5rem; color:#e6431e;" class="fa fa-heart" aria-hidden="true">&nbsp</i>
                    <i v-else style="font-size: .5rem; color:#e6431e;" class="fa fa-heart-o" aria-hidden="true">&nbsp</i>
                  </span>
                <span style="float:right">{{transDate(sit.createdAt)}}</span>
              </p>
              <div style="width:100%;display: flex;align-items: center;justify-content: space-between;flex-flow: nowrap">
                  <span style="max-width:80%;word-break:normal;word-wrap:break-word;overflow:hidden ; ">
                    {{sit.content}}
                  </span>
                <i class="fa fa-chevron-right fa-lg" style="font-size:1rem;vertical-align:1rem;color:#ababab;float:right;"></i>
              </div>
            </div>
          </div>
          <div>
            <div v-show="!isComment" style="text-align: center;color:#4a4a4a;">
              <span>暂无评论</span>
            </div>
          </div>
          <div style="margin-top:2rem;margin-bottom:2rem;display: flex;justify-content: center;">
            <div style="height:3rem;line-height:3rem;width:100%;border-radius:4px;background-color: #26a2ff;text-align: center;display:fixed;bottom:0" @click="addComment">
              <span style="font-size:1.2rem;color:#ffffff;">添加评论</span>
            </div>
          </div>
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
  import {Navbar, TabItem, MessageBox} from 'mint-ui'
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
        isComment: false,
        commentList: [],
        newComment: [],
      }
    },
    created(){
      this.activity = this.$route.params.activity;
      this.getEnrollStatus();
      this.getCollectStatus();
      this.getComment();
    },
    watch:{
    },
    methods: {
      enrollActivity() {
        jsonServices.EnrollActivity({token:this.token, activity_id:this.activity.id}).then(res => {
          if(res.data.code === 1) {
            if(res.data.msg === 'success') {
              this.myEnroll = true;
              this.getEnrollStatus();
              jsonServices.ActivityDetail({id: this.activity.id}).then(res => {
                if(res.data.code === 1) {
                  this.activity = res.data.result;
                }
              })
            }
            else if(res.data.msg === 'failed') {
              MessageBox('提示', '招募人数已满或招募截至日期已过！');
            }
          }
        })
      },

      unEnrollActivity() {
        jsonServices.UnEnrollActivity({token:this.token, activity_id:this.activity.id}).then(res => {
          if(res.data.code === 1) {
            this.myEnroll = false;
            jsonServices.ActivityDetail({id: this.activity.id}).then(res => {
              if(res.data.code === 1) {
                this.activity = res.data.result;
              }
            })
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

      collectActivity() {
        jsonServices.CollectActivity({token:this.token, activity_id:this.activity.id}).then(res => {
          if(res.data.code === 1) {
            if(res.data.msg === 'success'){
              this.myCollect = true;
              //   this.getEnrollStatus();
            }
            else{
              MessageBox('提示', '操作失败');
            }
          }
        })
      },

      getCollectStatus() {
        jsonServices.UserCollect({token:this.token, activity_id:this.activity.id}).then(res => {
          if(res.data.code == 1) {
            if(res.data.result.length > 0){
              this.myCollect = true;
            }

          }
        })
      },

      unCollectActivity() {
        jsonServices.UnCollectActivity({token:this.token, activity_id:this.activity.id}).then(res => {
          if(res.data.code === 1) {
            this.myCollect = false;
          }
        })
      },

      getComment() {
        jsonServices.GetActivityComment({activity_id: this.activity.id}).then(res => {
          if(res.data.code === 2) {
            this.isComment = false;
          }
          else if(res.data.code === 1) {
            this.isComment = true;
            this.commentList = res.data.result;
            for(let i=0; i<2; i++) {
              this.newComment.push(this.commentList[i]);
            }
          }
        })
      },

      addComment() {
        this.$router.push({
          name: "AddComment",
          params: {activity: this.activity,}
        });
      },

      showComment() {},
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
    margin:1.5rem 1rem;
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
