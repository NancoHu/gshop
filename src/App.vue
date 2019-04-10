<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";

export default {
  computed: {
    ...mapState(["address"])
  },

  async created() {
    if (!this.address.name) {
      const address = await this.getAddress();
      if (!address) {
        this.$router.replace("./address");
      }
    }
    this.getUserInfo();
  },

  methods: {
    ...mapActions(["getAddress", "getUserInfo"])
  },

  components: {
    FooterGuide
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.app
  width 100%
  height 100%
  background #f5f5f5
</style>