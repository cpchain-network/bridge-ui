<template>
  <div class="drawer">
    <div :class="maskClass"   @click="closeByMask"></div>
    <div :class="mainClass" :style="mainStyle" class="main">
      <!-- <div class="drawer-head">
        <span>{{ title }}</span>
        <span class="close-btn" v-show="closable" @click="closeByButton"
          >X</span
        >
      </div> -->
      <div class="drawer-body" :style="{height:bodyHeight  }">
        <slot />
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    // 是否打开
    display: {
      type: Boolean,
    },

    // 标题
    title: {
      type: String,
      default: "标题",
    },

    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true,
    },

    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true,
    },

    // 是否点击遮罩关闭
    maskClosable: {
      type: Boolean,
      default: true,
    },

    // 宽度
    width: {
      type: String,
      default: "100%",
    },
    bodyHeight:{
        type: String,
      default: "100%",
    },
    // 是否在父级元素中打开
    inner: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    maskClass: function () {
      return {
        "mask-show": this.mask && this.display,
        "mask-hide": !(this.mask && this.display),
        inner: this.inner,
      };
    },
    maskStyle: function () {
      return {
        height:
          document.documentElement.clientHeight || document.body.clientHeight,
      };
    },
    mainClass: function () {
      return {
        "main-show": this.display,
        "main-hide": !this.display,
        inner: this.inner,
      };
    },
    mainStyle: function () {
      return {
        width: this.width,
        left: this.display ? "0" : `-${this.width}`,
        borderLeft: this.mask ? "none" : "1px solid #eee",
      };
    },
  },
  mounted() {
    if (this.inner) {
      let box = this.$el.parentNode;
      box.style.position = "relative";
    }
  },
  methods: {
    closeByMask() {
      this.maskClosable && this.$emit("update:display", false);
    },
    closeByButton() {
      this.$emit("update:display", false);
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.drawer {
  /* 遮罩 */
  .mask-show {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transition: opacity 0.5s;
  }
  .mask-hide {
    opacity: 0;
    transition: opacity 0.5s;
  }

  /* 滑块 */
  .main {
    position: absolute;
    z-index: 10;
    top: 80px;
    height: 100%;
    background: #fff;
    transition: all 0.5s;
  }
  .main-show {
    opacity: 1;
  }
  .main-hide {
    opacity: 0;
  }

  /* 某个元素内部显示 */
  .inner {
    position: absolute;
  }

  /* 其他样式 */
  .drawer-head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    .close-btn {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      padding-left: 20px;
    }
  }
  .drawer-body {
    font-size: 14px;
    // padding: 15px;
    background-color: #f5f5f5;
    overflow-y: auto;
  }
}
</style>