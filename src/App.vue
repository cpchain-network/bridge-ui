<template>
  <div id="app">
    <div class="main-box">
      <HeaderNav></HeaderNav>
      <div class="m-router-view">
        <router-view></router-view>
      </div>
      <footerNav/>
      
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav/navBar.vue";

import  FooterNav   from "@/components/footer"
export default {
  name: "App",
  components: {
    HeaderNav,
    FooterNav,
  },
  data() {
    return {
      screenWidth: 0,
    };
  },
  watch: {
    screenWidth: function (n, o) {
      this.$store.state.system.screenWidth =
        document.documentElement.clientWidth; //窗口宽度
      if (n <= 1200) {
        // console.log("屏幕宽度小于1200了");
      } else {
        // console.log("屏幕宽度大于1200");
      }
    },
  },
  mounted() {
    //获取屏幕尺寸
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      //屏幕尺寸变化
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  /* background-image: url("@/assets/imgs/home/bg.png");
  background-position: left top;
  background-repeat: no-repeat;
  background-size: 100%; */
 background: #121212;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.main-box {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  /* min-width: 800px; */
}
.m-router-view {
  /* margin-top: 80px; */
  flex: 1;
}
</style>
