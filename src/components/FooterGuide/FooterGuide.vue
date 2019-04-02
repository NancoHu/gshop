<template>
  <footer class="footer_guide border-1px">
    <a href="javascript:;" class="guide_item" :class="{on:isCurrent('/msite')}">
      <span class="item_icon" @click="goto('/msite')">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on:isCurrent('/search')}">
      <span class="item_icon" @click="goto('/search')">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on:isCurrent('/order')}">
      <span class="item_icon" @click="goto('/order')">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on:isCurrent('/profile')}">
      <span class="item_icon" @click="goto('/profile')">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>

<script>
export default {
  methods: {
    goto(path) {
      if (this.$router.history.current.path === "/msite" && path === "/msite") {
        // 当用户在首页时，再点击首页按钮，将首页滚动回顶部
        this.$bus.$emit("msiteScrollToTop");
        return;
      }
      this.$router.replace(path);
    },
    isCurrent(path) {
      // console.log(this.$route.path)
      return this.$route.path === path;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'

.footer_guide
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff
  width 100%
  height 50px
  display flex

.guide_item
  display flex
  flex 1
  text-align center
  flex-direction column
  align-items center
  margin 5px
  color #999999

  &.on
    color #02a774

  span
    font-size 12px
    margin-top 2px
    margin-bottom 2px

  .iconfont
    font-size 22px
</style>
