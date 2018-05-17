<template>
  <div class="login">
    <div>
      <p style="font-size:1.5rem;color:#26a2ff">登陆</p>
    </div>
    <div class="in-group">
      <i class="fa fa-user"></i>
      <mt-field  label="账号" placeholder="用户名或手机号" type="username" v-model="account" style="border-top: 1px solid #9b9b9b;"></mt-field>
    </div>
    <div class="in-group">
      <i class="fa fa-lock"></i>
      <mt-field  label="密码" placeholder="请输入密码" type="password" v-model="password" style="border-bottom: 1px solid #9b9b9b;"></mt-field>
    </div>

    <div style="height:1rem;"></div>
    <mt-button type="primary" style="width:90%;">登陆</mt-button>
    <div>
      <p>没有账号？立即注册</p>
      <p>忘记密码</p>
    </div>
  </div>

</template>

<script>
  import { Field,Button } from 'mint-ui';

  export default {
    name: "Login",
    data() {
      return {
        account: '',
        password: '',
      }
    }

  }
</script>

<style scoped>
  .in-group {
   position:relative;
  }
  .in-group>i {
    position: absolute;
    left:10px;
    top:10px;
  }

</style>
