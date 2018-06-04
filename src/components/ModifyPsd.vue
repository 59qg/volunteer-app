<template>
  <div class="modify-psd">
    <mt-header fixed title="修改密码" style="height:60px; font-size:1rem; background:#f3f7f9; color:#4a4a4a;">
      <router-link to="/my-info" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <mt-field  label="旧密码" placeholder="旧密码" type="oldPassword" ref="password0" v-model.lazy="password0" style="margin-top:60px;"></mt-field>
    <mt-field  label="新密码" placeholder="新密码" type="password" ref="password1" v-model.lazy="password1" @change="passwordCheck1()"></mt-field>
    <mt-field  label="确认新密码" placeholder="新密码" type="password" ref="password2" v-model.lazy="password2" @change="passwordCheck2()"></mt-field>
    <!--<mt-field  label="生日" placeholder="请输入生日" type="date" v-model="birth"></mt-field>-->
    <!--<mt-field  label="姓名" placeholder="请输入姓名" type="text" v-model="name"></mt-field>-->
    <!--<mt-field  label="手机号" placeholder="请输入手机号" type="tel" ref="phone" v-model.lazy="phone" @change="phoneCheck()"></mt-field>-->
    <!--<mt-field  label="身份证号" placeholder="请输入身份证号" type="text" v-model="id_card"></mt-field>-->
    <!--<mt-field  label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>-->
    <!--<mt-field  label="地址" placeholder="请输入地址" type="text" v-model="address" ></mt-field>-->
    <!--<mt-field  label="简介" placeholder="简单介绍下自己" type="textarea" rows="4" v-model="desc"></mt-field>-->

    <div style="height:2rem;"></div>
    <mt-button type="primary" style="width:90%;" @click="modifyPsd()">修改</mt-button>
    <!--<div style="margin-top:1rem;">-->
      <!--<p @click="login()">返回登陆</p>-->
    <!--</div>-->
  </div>
</template>

<script>
  import * as jsonServices from "../services/jsonholder";
  import { Toast, Radio } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import crypto from 'crypto';

  export default {
    name: "ModifyPsd",
    data() {
      return {
        password0: '',
        password1: '',
        password2: '',
        token: localStorage.getItem('token'),
      }
    },

    created() {

    },
    watch: {
      // username: function(newVal,oldVal){
      //   console.log(newVal,oldVal)
      // }
    },
    methods: {
      modifyPsd() {
        if(this.password0.trim() == '' || this.password1.trim() == '' ||
          this.password2.trim() == ''){
          Toast('请检查输入');
        }
        else {
          jsonServices.ModifyPsd({token: this.token,
            oldPsd: crypto.createHash('md5').update(this.password0).digest('hex'),
            newPsd: crypto.createHash('md5').update(this.password1).digest('hex')}).then(res => {
            if(res.data.code == 1) {
              if(res.data.msg == '旧密码错误') {
                MessageBox('提示','旧密码输入错误');
                this.password0 = '';
                this.password1 = '';
                this.password2 = '';
              }
              else{
                Toast({
                  message: '修改成功',
                  iconClass: 'mintui mintui-success',
                  duration: 1500
                });
                this.$router.push({
                  name: "MyInfo",
                });
              }
            }
          })
        }


      },


      passwordCheck1() {
        if(this.password1.length<6 ||this.password1.length>18) {
          Toast('密码长度为6-18位，请检查');
          this.$refs.password1.state = 'error';
        }
        else {
          this.$refs.password1.state = 'success';
        }
      },

      passwordCheck2() {
        if(this.password1 != this.password2) {
          Toast('两次输入密码不一致，请检查');
          this.$refs.password2.state = 'error';
        }
        else {
          this.$refs.password2.state = 'success';
        }
      },
    }

  }
</script>

<style scoped>
  *{
    text-align: center;
  }
  .register {
    margin-top:2rem;
    padding: 0 1rem;
  }
  .top {
    font-size:1.5rem;
    color:#26a2ff;
    margin:2rem;
  }
</style>
