<template>
  <div class="news-detail">

    <mt-header fixed title="志愿新闻" style="height:60px; font-size:1rem; background:#f3f7f9; color:#4a4a4a;">
      <router-link to="/news-list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="info" style="margin-top:60px;">
      <div class="content">
        <div class="row">
          <div id="title" style="text-align: center;line-height: 2rem;">
            <p style="font-size:1.5rem;">{{news.title}}</p>
          </div>
        </div>
      </div>
      <div class="content" >
        <div class="row" id="info1" style="padding:.5rem;">
          <p style="text-align: center;">
            <span>{{transDate(news.time)}}</span>
          </p>
          <p>
            <span>{{news.content}}</span>
          </p>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import {Navbar, TabItem} from 'mint-ui'
  import {Header } from 'mint-ui'
  import * as jsonServices from "../services/jsonholder";
  import moment from 'moment'

  export default {
    name: "NewsDetail",
    data(){
      return {
        token: localStorage.getItem('token'),
        news: '',
      }
    },
    created(){
      this.news = this.$route.params.news;
    },
    watch:{

    },
    methods: {
      transDate(date) {
        return moment(date).format("YYYY-MM-DD");
      },
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
