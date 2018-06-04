<template>
  <div class="my-info">
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
      </mt-tab-container-item>
      <mt-tab-container-item id="3">

      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div class="content">
          <div class="login" v-show="!isLogin">
            <p @click="login()">点击登陆</p>
          </div>
          <div class="pic" @click="actionSheet" v-show="isLogin">
            <img :src="myInfo.pic">
          </div>
          <div class="name" v-show="isLogin">
            <p>{{myInfo.username}}</p>
          </div>
          <div class="info">
            <mt-cell title="我的资料" is-link>
              <span style="color: green"></span>
            </mt-cell>
            <mt-cell title="修改密码" is-link to="/modify-psd">
              <span style="color: green"></span>
            </mt-cell>
            <mt-cell title="实名信息" is-link>
              <span style="color: green"></span>
            </mt-cell>
            <div style="margin-top:3rem;width:100%;display:flex;justify-content: center">
              <mt-button type="primary" style="width:90%;" @click="logout()">退出登录</mt-button>
            </div>
          </div>


          <input @change="chooseFile($event)" type="file" id="upload_file" multiple style="display: none"/>



          <mt-actionsheet
            :actions= "data"
            v-model="sheetVisible">
          </mt-actionsheet>
        </div>
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
  import {Navbar, TabItem, MessageBox} from 'mint-ui'
  import * as jsonServices from "../services/jsonholder";
  import moment from 'moment'
  import axios from 'axios';

  export default {
    name: "MyInfo",
    data(){
      return {
        selected: '4',
        token: localStorage.getItem('token'),
        isLogin: false,
        myInfo: '',
        // action sheet 选项内容
        data: [{
          name: '拍照',
          method : this.getCamera// 调用methods中的函数
      }, {
        name: '从相册中选择',
        method : this.getLibrary// 调用methods中的函数
        }],
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false
    }
    },
    created(){
      if(!this.token || this.token === '') {
        this.isLogin = false;
      }else {
        this.isLogin = true;
        this.getMyInfo();
      }
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
        if(newVal === '4') {
          this.$router.push({
            name: "MyInfo",
          })
        }
      }
    },
    methods: {
      getMyInfo: function() {
        var data = {};
        data.token = this.token;
        jsonServices.GetUserInfo(data).then(res => {
          if(res.data.code === 1) {
            this.myInfo = res.data.result;
          }
        })
      },

      actionSheet: function(){
        if(!this.token || this.token === ''){
          MessageBox('提示', '请先登录哦');
        }else{
          this.sheetVisible = true;
        }
      },
      getCamera: function(){
        console.log("此功能暂未开放");
      },
      getLibrary: function(){
        //$('input[type=file]').trigger('click');
       // MessageBox('提示','相册');
        document.getElementById('upload_file').click();
        // return false;
      },

      chooseFile(el){
        if (!el.target.files[0].size) return;//判断是否有文件数量
        this.fileList(el.target.files);//获取files文件组传入处理
        el.target.value = ''//清空val值，以便可以重复添加一张图片
      },

      fileList(files){
        if(files.length > 1) {
          MessageBox('提示','只能选择一张照片上传哦')
        }
        else{

          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          }; //添加请求头
          let param = new FormData() // 创建form对象
          param.append('file', files[0]) // 通过append向form对象添加数据
          param.append('token', this.token) // 添加form表单中其他数据
          axios.post('http://127.0.0.1:3020/volunteer/appapi/user/pic',param,config)
            .then(res=>{
              if(res.data.code === 1) {
                this.getMyInfo();
                Toast({
                  message: '上传成功',
                  iconClass: 'mintui mintui-success',
                  duration: 1500
                });
              }
              else {
                Toast({
                  message: res.data.msg,
                  duration: 1500
                });
              }
            })
        }
      },

      login() {
        this.$router.push({
          name: "Login",
        });
      },

      logout() {
        localStorage.setItem('token', '');
        this.token = '';
        this.isLogin = false;
      },

      modifyPsd() {
        if(!this.token || this.token === ''){
          MessageBox('提示', '请先登录哦');
        }else{
          this.$router.push({
            name:"ModifyPsd"
          })
        }
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
  .content {
    margin:2rem 1rem;
  }
  .login{
    height:6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login p {
    font-size:1.2rem;
    color:#2c3e50;
  }
  .pic{
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .pic img{
    width:5rem;
    height:5rem;
    border-radius: 2.5rem;
  }
  .name {
    width:100%;
    text-align: center;
    margin-top: 1rem;
  }
  .name p {
    font-size:1.2rem;
    color:#483d8b;
  }

  .info {
    margin-top:2rem;
  }

</style>
