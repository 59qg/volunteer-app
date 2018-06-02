<template>
  <div class="register">
    <div>
      <p style="font-size:1.5rem;color:#26a2ff">新用户注册</p>
    </div>
    <mt-field  label="用户名" placeholder="请设置用户名" type="text" ref="username" v-model.lazy="username" @change="nameCheck()"></mt-field>
    <mt-field  label="密码" placeholder="密码" type="password" ref="password1" v-model.lazy="password1" @change="passwordCheck1()"></mt-field>
    <mt-field  label="确认密码" placeholder="密码" type="password" ref="password2" v-model.lazy="password2" @change="passwordCheck2()"></mt-field>
    <!--<mt-field  label="生日" placeholder="请输入生日" type="date" v-model="birth"></mt-field>-->
    <!--<mt-field  label="姓名" placeholder="请输入姓名" type="text" v-model="name"></mt-field>-->
    <mt-field  label="手机号" placeholder="请输入手机号" type="tel" ref="phone" v-model.lazy="phone" @change="phoneCheck()"></mt-field>
    <!--<mt-field  label="身份证号" placeholder="请输入身份证号" type="text" v-model="id_card"></mt-field>-->
    <!--<mt-field  label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>-->
    <!--<mt-field  label="地址" placeholder="请输入地址" type="text" v-model="address" ></mt-field>-->
    <!--<mt-field  label="简介" placeholder="简单介绍下自己" type="textarea" rows="4" v-model="desc"></mt-field>-->

    <div style="height:1rem;"></div>
    <mt-button type="primary" style="width:90%;" @click="register()">注册</mt-button>
  </div>
</template>

<script>
  import * as jsonServices from "../services/jsonholder";
  import { Toast, Radio } from 'mint-ui';
  import crypto from 'crypto';

  export default {
    name: "Register",
    data() {
      return {
        username: '',
        password1: '',
        password2: '',
        phone: '',
        userState: '',
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
      register() {
        if(this.username.trim() == '' || this.password1.trim() == '' ||
          this.password2.trim() == '' || this.phone.trim() == ''){
          Toast('请检查输入');
        }
        else {
          jsonServices.RegisterCheck({phone: this.phone}).then(res => {
            if(res.data.code == 1) {
              if(res.data.msg == '手机号重复') {
                Toast('该手机号已被注册');
                this.$refs.phone.state = 'error';
              }
              else{
                this.$refs.phone.state = 'success';
                if(this.$refs.username.state === 'success' &&
                  this.$refs.password1.state === 'success' &&
                  this.$refs.password2.state === 'success' &&
                  this.$refs.phone.state === 'success') {
                  var data = {
                    username: this.username,
                    password: crypto.createHash('md5').update(this.password1).digest('hex'),
                    phone: this.phone,
                  }
                  jsonServices.Register(data).then(res => {
                    if(res.data.code == 1) {
                      if(res.data.msg == '注册成功') {
                        Toast('注册成功，正在跳转登陆');
                        this.$router.push({
                          path: '/Login'
                        });
                      }
                      else {
                        Toast(res.data.msg);
                      }
                    }
                  })
                }
                else {
                  Toast('请检查输入')
                }
              }
            }
          })
        }


      },

      nameCheck() {
        jsonServices.RegisterCheck({username: this.username}).then(res => {
          console.log(res);
          if(res.data.code === 1) {
            if(res.data.msg === '用户名重复') {
              Toast('该用户名已被注册');
              this.$refs.username.state = 'error';
            }
            else {
              this.$refs.username.state = 'success';
            }
          }
        })
      },

      phoneCheck() {
        jsonServices.RegisterCheck({phone: this.phone}).then(res => {
          if(res.data.code == 1) {
            if(res.data.msg == '手机号重复') {
              Toast('该手机号已被注册');
              this.$refs.phone.state = 'error';
            }
            else{
              this.$refs.phone.state = 'success';
            }
          }
        })
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
      }
    }

  }
</script>

<style scoped>
  html {
    text-align: center;
  }
</style>
