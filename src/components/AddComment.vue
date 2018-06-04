<template>
  <div id="AddComment">
    <mt-header fixed title="添加评论" style="height:60px; font-size:1rem; background:#f3f7f9; color:#4a4a4a;">
      <router-link :to="{name:'ActivityDetail',params:{activity:activity}}" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div style="width:100%;height:3rem;top:60px;background-color:#FFFFFF;display:flex;justify-content:center;align-items:center;position: fixed; border-bottom: 2px solid #F3F7F8">
      <span style="font-size:1.2rem;">{{activity.title}}</span>
    </div>
    <div style="display: flex;justify-content: center">
      <div style="width:90%;margin-top:9rem;">
        <p style="font-size:1.2rem;">评论星级</p>
        <!--<select  v-model="comment.score">-->
        <!--<option value="0" selected="selected">0</option>-->
        <!--<option value="1">1</option>-->
        <!--<option value="2">2</option>-->
        <!--<option value="3">3</option>-->
        <!--<option value="4">4</option>-->
        <!--<option value="5">5</option>-->
        <!--</select>-->
        <div class="starcontent">
          <div class="star">
            <span><i v-for="(star, index) in stars" style="font-size: 3rem; color:#e6431e;" :class="{'fa fa-heart-o': star.a, 'fa fa-heart': star.b}" aria-hidden="true" @click="rating(index)">&nbsp</i></span>
          </div>
        </div>

        <p style="font-size:1.2rem;">评论内容</p>
        <textarea v-model="comment.content" style="  width: 100%;margin-top:2rem;
                height: 12rem;
                border: 1px solid #EBEBEB;
                font-size: 1.4rem;
                box-shadow: none;
                -webkit-appearance: none;"></textarea>

        <div style="margin-top:2rem;margin-bottom:2rem;display: flex;justify-content: center;">
          <div style="height:3rem;line-height:3rem;width:100%;border-radius:4px;background-color: #26a2ff;text-align: center;" @click="addComment">
            <span style="font-size:1.2rem;color:#ffffff;">提交评论</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import * as jsonServices from "../services/jsonholder";
  import { Toast, Radio } from 'mint-ui';

  export default {
    name: "AddComment",
    data() {
      return {
        activity: '',
        token: localStorage.getItem('token'),
        comment: {},
        stars: [{
          a:true,
          b:false,
          active: false
        }, {
          a:true,
          b:false,
          active: false
        }, {
          a:true,
          b:false,
          active: false
        },
          {
            a:true,
            b:false,
            active: false
          }, {
            a:true,
            b:false,
            active: false
          }
        ],
        starNum: 0,
      }
    },
    created() {
      this.activity = this.$route.params.activity;
      console.log(this.activity);
      this.comment.score = 0;
    },
    methods: {
      rating(index) {
        var total = this.stars.length; //星星总数
        var idx = index + 1; //这代表选的第idx颗星-也代表应该显示的星星数量

        //进入if说明页面为初始状态
        if(this.starNum == 0) {
          this.starNum = idx;
          for(var i = 0; i < idx; i++) {
            this.stars[i].a = false;
            this.stars[i].b = true;
            this.stars[i].active = true;
          }
        } else {
          //如果再次点击当前选中的星级-仅取消掉当前星级，保留之前的。
          if(idx == this.starNum) {}
          //如果小于当前最高星级，则直接保留当前星级
          if(idx < this.starNum) {
            for(var i = idx; i < 5; i++) {
              this.stars[i].a = true;
              this.stars[i].b = false;
              this.stars[i].active = false;
            }
            this.starNum = idx;
          }
          //如果大于当前星级，则直接选到该星级
          if(idx > this.starNum) {
            for(var i = 0; i < idx; i++) {
              this.stars[i].a = false;
              this.stars[i].b = true;
              this.stars[i].active = true;
            }
            this.starNum = idx;
          }
        }

        var count = 0; //计数器-统计当前有几颗星
        for(var i = 0; i < total; i++) {
          if(this.stars[i].active) {
            count++;
          }
        }
        this.comment.score = count;
      },

      addComment() {
        let query = {};
        query.star = this.comment.score;
        query.content = this.comment.content;
        query.activity_id = this.activity.id;
        query.token = this.token;
        jsonServices.UserComment(query).then(res => {
          if (res.data.code == 1) {
            Toast({
              message: '提交成功',
              iconClass: 'mintui mintui-success',
              duration: 1500
            });
            this.$router.push({
              name: "ActivityDetail",
              params: {activity:this.activity}
            });
          } else {
            Toast({
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      }
    },

    components: {}
  }
</script>

<style>
  .starcontent {
    width:100%;
    margin: 2rem 0;
    display: flex;
    justify-content: center;
  }
  .star {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    min-width:30%;
  }

</style>
