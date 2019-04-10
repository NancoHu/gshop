<template>
  <section class="address">
    <HeaderTop title="地址"></HeaderTop>

    <section class="info_area">
      <section class="info_line">
        <label for="district">所在地区</label>
        <input
          id="district"
          type="text"
          maxlength="50"
          autocomplete="off"
          placeholder="请选择地区"
          readonly="readonly"
          @click="setSelectShow(true)"
          v-model="district"
        >
      </section>
      <section class="info_line">
        <label for="address">详细地址</label>
        <input id="address" type="text" autocomplete="off" placeholder="街道、楼号" v-model="address">
      </section>
      <mt-button type="primary" @click="commitAll">确认</mt-button>
    </section>

    <DistrictPicker
      :selectShow="selectShow"
      @setSelectShow="setSelectShow"
      @closeSelect="closeSelect"
      @commitDistrict="commitDistrict"
    />
  </section>
</template>

<script>
import getLocation from "../../../static/js/geolocation.js";
import { Toast, Indicator } from "mint-ui";

import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import DistrictPicker from "../../components/DistrictPicker/DistrictPicker.vue";

export default {
  data() {
    return {
      district: "",
      address: "",
      selectShow: false
    };
  },
  methods: {
    showPosition(position) {
      Indicator.close();
      this.$router.replace("./msite");
    },
    showError(errorMsg) {
      Indicator.close();
      Toast(errorMsg + "，请手动选择您的地址！");

      this.setSelectShow(true);
    },
    setSelectShow(v) {
      this.selectShow = v;
    },
    commitDistrict(district) {
      this.district = district;
    },
    closeSelect() {
      if (!this.district) {
        Toast("请选择所在地区！");
        return;
      }
      this.setSelectShow(false);
    },
    commitAll() {
      if (!this.district || !this.address) {
        Toast("请填写您的地址，否则您无法使用本产品！");
        return;
      }
      this.$store.dispatch("updateAddress", {
        name: this.district + this.address
      });
      this.$router.replace("./msite");
    }
  },
  components: {
    HeaderTop,
    DistrictPicker
  },
  created() {
    getLocation(this.showPosition, this.showError);
    Indicator.open("地理位置信息获取中...");
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.address
  position absolute
  height calc(100% - 55px)
  width 100%
  padding-top 55px
  color #333
  font-size 16px
  background-color #f2f2f2
  overflow auto

  .info_area
    top-border-1px(#c8c7cc)

    button
      width 96%
      background #02a774
      margin-left 2%
      margin-top 10px

    .info_line
      position relative
      padding 5px 15px
      background #fff
      bottom-border-1px(#c8c7cc)

      label
        width 30%

      input
        width 70%
        height 45px
        padding-left 10px
        border none
        outline 0
        font 400 14px Arial
</style>
