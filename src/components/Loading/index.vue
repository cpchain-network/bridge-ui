<template>
  <div v-show="isVisible" class="overlay">
    <img src="@/assets/imgs/token/loading.gif" alt="Loading..." class="loading-image" />
  </div>
</template>
  
  <script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
  
  <style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* 遮罩层背景 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  z-index: 1000; /* 确保遮罩层在最上面 */
}

.loading-image {
  /* 如果需要，可以添加更多样式来控制loading.gif图像的大小和响应式表现 */
  width: 60px;
}
</style>
  