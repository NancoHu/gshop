<template>
  <section class="userinfo">
    <HeaderTop title="账户信息">
      <a href="javascript:" class="go_back" @click="$router.back()" slot="left">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </HeaderTop>

    <section class="info_area">
      <section class="info_line headportrait">
        <input type="file" class="headportrait_upload" accept="image/*">
        <h2 class="info_title">头像</h2>
        <div class="info_content">
          <i class="iconfont icon-person"></i>
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </section>
      <section class="info_line">
        <h2 class="info_title">用户名</h2>
        <div class="info_content">
          <span>{{userInfo.name}}</span>
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </section>

      <section class="info_line">
        <h2 class="info_title">收获地址</h2>
        <div class="info_content">
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </section>
    </section>

    <section class="info_area">
      <p>账号绑定</p>
      <section class="info_line">
        <h2 class="info_title">
          <span>手机</span>
        </h2>
        <div class="info_content">
          <span>{{userInfo.phone}}</span>
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </section>
    </section>

    <section class="info_area">
      <p>安全设置</p>
      <section class="info_line">
        <h2 class="info_title">登录密码</h2>
        <div class="info_content">
          <span>修改</span>
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </section>
    </section>

    <section class="info_area logout">
      <mt-button type="danger" style="width: 100%" v-if="userInfo._id" @click="logout">退出登陆</mt-button>
    </section>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox, Toast } from "mint-ui";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

export default {
  computed: {
    ...mapState(["userInfo"])
  },
  components: {
    HeaderTop
  },
  methods: {
    logout() {
      MessageBox.confirm("确认退出吗?").then(
        action => {
          // 请求退出
          this.$store.dispatch("logout");
          Toast("登出完成");
          this.$router.replace("/profile");
        },
        action => {
          // 点击了取消
        }
      );
    }
  },
  updated() {
    if (!this.userInfo._id) this.$router.replace("./login");
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.go_back
  position absolute
  left 15px
  top 50%
  width 10%
  height 50%
  transform translateY(-50%)

  >.iconfont
    font-size 20px
    color #fff

.userinfo
  position absolute
  height calc(100% - 55px)
  width 100%
  padding-top 55px
  color #333
  font-size 16px
  background-color #f2f2f2
  overflow auto

  .info_area
    top-border-1px(#f1f1f1)

    p
      padding 10px
      font-size 13px

    .info_line
      position relative
      padding 18px 10px
      display flex
      -ms-flex-pack justify
      justify-content space-between
      -ms-flex-align center
      align-items center
      background #fff
      clearFix()
      bottom-border-1px(#f1f1f1)

      .info_content
        color #7e8c8d

        .icon-jiantou1
          display inline-block
          padding-left 5px
          color #bbb
          font-size 16px

.headportrait
  position relative

  input.headportrait_upload
    position absolute
    top 0
    left 0
    opacity 0
    width 100%
    height 100%

  .icon-person
    display inline-block
    background #e4e4e4
    font-size 62px
    width 60px
    height 60px
    border-radius 50%
    overflow hidden
    vertical-align middle

  .icon-jiantou1
    position relative
    top 2px

.logout
  padding 18px 0px
</style>

