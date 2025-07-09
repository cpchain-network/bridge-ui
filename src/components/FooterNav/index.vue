<template>
  <div class="footer">
    <div class="copyright">
      <span>Dapplink Bridge© 2024</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "FooterNav",
  data() {
    return {
    };
  },
  methods: {
    goto(url) {
      if (url == "email") {
      } else {
        window.open(url, "_blank"); // 新窗口打开外链接
      }
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  color: #47494e;
  text-decoration: none;
}
.footer {
  width: 100%;
  // margin-top: 50px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  .copyright{
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      //color: #fff;
    }
    img{
      margin-left: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
}
</style>