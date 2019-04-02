<template>
  <div class="ball-wrapper">
    <transition-group name="drop" tag="div" @before-enter="beforeEnter" @after-enter="afterEnter">
      <div
        class="ball"
        :data-startx="ball.startX"
        :data-starty="ball.startY"
        v-for="(ball,index) in balls"
        v-show="ball.show"
        :key="index"
      >
        <div class="inner inner-hook" :style="`background-image:url(${ball.icon})`"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { setTimeout, setInterval } from "timers";
export default {
  data() {
    return {
      balls: [],
      nextBall: true,
      clientHeight: document.body.offsetHeight
    };
  },

  methods: {
    dropMove(data) {
      this.$nextTick(() => {
        this.balls.push({
          ...data,
          show: true
        });
      });
    },
    beforeEnter(el, done) {
      let startX = el.getAttribute("data-startx"),
        startY = el.getAttribute("data-starty");
      el.style.transform = `translate3d(0,-${this.clientHeight -
        startY -
        50}px,0)`;
      el.style.webkitTransform = `translate3d(0,-${this.clientHeight -
        startY -
        50}px,0)`;
      let inner = el.getElementsByClassName("inner-hook")[0];
      inner.style.webkitTransform = `translate3d(${startX - 20}px,0,0)`;
      inner.style.transform = `translate3d(${startX - 20}px,0,0)`;
    },
    afterEnter(el) {
      el.style.display = "none";
    }
  },

  mounted() {
    this.$bus.on("addFlyBall", this.dropMove);
    this.autoClearBalls = setInterval(() => {
      this.balls.splice(0, this.balls.length);
    }, 10000);
  },

  destroyed() {
    clearInterval(this.autoClearBalls);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.ball-wrapper
  .ball
    position fixed
    left 12px
    bottom 22px
    z-index 200

    .inner
      width 57px
      height 57px
      border-radius 50%
      // background-color #00A0DC
      background-size 57px 57px
      transition all 1s linear

    &.drop-enter-active
      transition all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41)

    // &.drop-enter
    // transform "translate3d(0," attr(data-starty) "px, 0)"

    // .inner
    // transform translate3d(300px, 0, 0)
    &.drop-enter-to
      transform translate3d(0, 0, 0) !important

      .inner
        transform translate3d(0, 0, 0) !important
</style>
