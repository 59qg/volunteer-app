<template>
  <div class="login">
    <div>
      <p class="top">登陆</p>
    </div>
    <div class="in-group">
      <i class="fa fa-user"></i>
      <mt-field  label="账号" placeholder="用户名或手机号" type="username" v-model="account" style="border-top: 1px solid #9b9b9b;"></mt-field>
    </div>
    <div class="in-group">
      <i class="fa fa-lock"></i>
      <mt-field  label="密码" placeholder="请输入密码" type="password" v-model="password" style="border-bottom: 1px solid #9b9b9b;"></mt-field>
    </div>

    <div style="height:2rem;"></div>
    <mt-button type="primary" style="width:90%;" @click="login()">登陆</mt-button>
    <div style="margin-top:1rem;">
      <p @click="register()">没有账号？立即注册</p>
      <!--<p>忘记密码</p>-->
    </div>
  </div>

</template>

<script>
  import { Field,Button } from 'mint-ui';
  import * as jsonServices from "../services/jsonholder";
  import crypto from 'crypto';

  export default {
    name: "Login",
    data() {
      return {
        account: '',
        password: '',
      }
    },
    created(){

    },
    methods: {
      register() {
        this.$router.push({
          name: "Register",
        });
      },

      login() {
        let data = {}
        data.account = this.account;
        data.password = crypto.createHash('md5').update(this.password).digest('hex');
        jsonServices.Login(data).then(res => {
          console.log(res);
          if(res.data.code == 1) {
            if(res.data.msg == '登陆成功') {
               localStorage.setItem('token', res.data.result.token);
               this.$router.push({
                 name: "ActivityList",
               })
            }
          }
        })
      }
    }

  }
</script>

<style scoped>
  *{
    text-align: center;
  }
  .login {
    margin-top:2rem;
    padding: 0 1rem;
  }
  .top {
    font-size:1.5rem;
    color:#26a2ff;
    margin:2rem;
  }
  .in-group {
   position:relative;
  }
  .in-group>i {
    position: absolute;
    left:10px;
    top:10px;
  }


</style>
