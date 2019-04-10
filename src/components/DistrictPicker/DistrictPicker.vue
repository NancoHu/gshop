<template>
  <transition name="fade">
    <div class="activity-select" v-show="selectShow">
      <div class="activity-select-content">
        <div class="select-head">
          <span class="select-cancle" @click="cancleClick">取消</span>
          <span class="select-ok" @click="okClick">完成</span>
        </div>
        <mt-picker :slots="myAddressSlots" @change="onAddressChange"></mt-picker>
      </div>
      <div class="activity-select-cover" @click="setSelectShow(false)"></div>
    </div>
  </transition>
</template>

<script>
import {
  city,
  privinceList,
  cityList,
  districtList
} from "../../api/district.js";

export default {
  name: "DistrictPicker",
  data() {
    return {
      areapicker: "",
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 0,
          values: privinceList, //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          pider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: cityList,
          className: "slot3",
          textAlign: "center"
        },
        {
          pider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: districtList,
          className: "slot5",
          textAlign: "center"
        }
      ],
      myAddressPrivince: "", //最后选中的省或直辖市
      myAddressCity: "", //最后选中的城市
      myAddressDistrict: "", //最后选中的区或者县
      district: ""
    };
  },
  props: {
    selectShow: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    myAddressPrivince(oldval, newval) {
      //省数据变化后，更新市的显示数据
      this.areapicker.setSlotValues(2, this.mycityList);
      this.areapicker.setSlotValue(2, this.mycityList[0]);
    },
    myAddressCity(oldval, newval) {
      //城市的值改变后，重置区县的数据
      this.areapicker.setSlotValues(4, this.mydistrictList);
      this.areapicker.setSlotValue(4, this.mydistrictList[0]);
    },
    myAddressDistrict(oldval, newval) {}
  },
  methods: {
    setSelectShow(v) {
      this.$emit("setSelectShow", v);
    },
    closeSelect() {
      this.$emit("closeSelect");
    },
    okClick() {
      this.$emit("commitDistrict", this.district);
      this.closeSelect();
    },
    cancleClick() {
      this.closeSelect();
    },
    onAddressChange: function(picker, values) {
      this.areapicker = picker;
      this.mycityList = [];
      this.mydistrictList = [];
      var chooseList = city.filter(function(item) {
        return item.name == values[0];
      });
      if (chooseList[0].sub) {
        for (var item of chooseList[0].sub) {
          this.mycityList.push(item.name);
        }
        //获取非直辖市数据
        if (chooseList[0].sub.length > 1) {
          var choosedisList = [];
          if (this.mycityList.indexOf(values[2]) > -1 && values[2] != "其他") {
            choosedisList = chooseList[0].sub.filter(function(item) {
              return item.name == values[2];
            });
            for (var item of choosedisList[0].sub) {
              this.mydistrictList.push(item.name);
            }
          } else {
            this.mydistrictList = [];
          }
        }
        //获取直辖市数据
        else {
          for (var item of chooseList[0].sub[0].sub) {
            this.mydistrictList.push(item.name);
          }
        }
      }
      this.myAddressPrivince = values[0];
      this.myAddressCity = values[2];
      this.myAddressDistrict = values[4];

      this.district = "";
      if (this.myAddressPrivince) this.district += this.myAddressPrivince;
      if (this.myAddressCity) this.district += this.myAddressCity;
      if (this.myAddressDistrict) this.district += this.myAddressDistrict;
    }
  },
  mounted() {
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0;
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.activity-select
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 999

  &.fade-enter-active, &.fade-leave-active
    transition opacity 0.5s

  &.fade-enter, &.fade-leave-to
    opacity 0

  .activity-select-content
    position absolute
    bottom 0
    left 0
    right 0
    z-index 100
    width 100%
    height 40%
    box-sizing border-box
    box-shadow 0 -1px 5px 0 rgba(0, 0, 0, 0.4)
    transition transform 0.2s
    will-change transform
    color #333
    background rgb(207, 213, 218)

    .select-head
      font-size 18px
      height 40px
      line-height 40px
      color rgb(0, 122, 255)
      background-color #f5f5f5
      padding 0px 10px

      .select-cancle
        float left

      .select-ok
        float right

    .select-area
      height 100%

  .activity-select-cover
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    background-color rgba(0, 0, 0, 0.5)
</style>
