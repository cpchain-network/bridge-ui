<template>
  <div class="footer">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="8">
        <div class="name1">
          <img src="@/assets/imgs/cpChain.png" style="width:120px">
        </div>
        <div class="name2" v-html="cpChainLineBreak($t('footers.title'))"></div>

        <div class="icon">
          <a target="_blank" href="https://x.com/CPCHAINGLOBAL">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 16" fill="none">
              <path
                d="M14.176 0H16.9362L10.9061 6.77744L18 16H12.4456L8.09512 10.4066L3.11722 16H0.355444L6.80517 8.75077L0 0H5.69546L9.62788 5.11262L14.176 0ZM13.2073 14.3754H14.7368L4.8644 1.53929H3.22317L13.2073 14.3754Z"
                fill="white" />
            </svg>


          </a>
        </div>

        <div class="contact">
          {{ $t('footers.contact') }} support@cpchain.com
        </div>
      </el-col>

      <el-col :xs="24" :sm="4">
        <br>
      </el-col>
      <el-col :xs="12" :sm="3">
        <div class="title">{{ $t('footers.content1.title') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content1.name1') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content1.name2') }}</div>
      </el-col>

      <el-col :xs="12" :sm="3">
        <div class="title">{{ $t('footers.content2.title') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content2.name1') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content2.name2') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content2.name3') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content2.name4') }}</div>
      </el-col>

      <el-col :xs="12" :sm="3">
        <div class="title">{{ $t('footers.content3.title') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content3.name1') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content3.name2') }}</div>
      </el-col>

      <el-col :xs="12" :sm="3">
        <div class="title">{{ $t('footers.content4.title') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content4.name1') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content4.name2') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content4.name3') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content4.name4') }}</div>
        <div class="list" @click="openPopup">{{ $t('footers.content4.name5') }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconSize: 15
    }
  },
  methods: {
    cpChainLineBreak(str) {
      if (!str) return '';
      // 正则查找"cp chain"，忽略大小写
      const reg = /cp chain/i;
      const match = str.match(reg);
      if (match && match.index === 0) {
        // 从头匹配，首行为cp chain
        const endIdx = match[0].length;
        return match[0] + '<br>' + str.slice(endIdx).trim();
      }
      // 不是开头出现也可以处理：
      if (match) {
        const idx = match.index;
        const endIdx = idx + match[0].length;
        // 分成两行
        return str.slice(0, endIdx) + '<br>' + str.slice(endIdx).trim();
      }
      // 没有匹配就原样返回
      return str;
    }
  }
}
</script>


<style scoped  lang="scss">
.footer {
  background: #151517;
  // height: 460px;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* 主轴改为竖直方向，从上到下 */
  // justify-content: flex-start; 
  padding: 0 76px;
  padding-bottom: 118px;
  padding-top: 80px;

  .content {
    // max-width: 1200px;

  }

  .icon {
    height: 40px;
    display: flex;
    align-items: center;
    width: 40px;
    background: rgb(44, 44, 46);
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 50%;

    :deep(.el-icon) {
      background: rgb(44 44 46);
      width: 40px;
      height: 40px;

      border-radius: 100px;
    }


  }

  .name1 {

    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #fff;
    margin-bottom: 10px;

  }

  .name2 {

    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #fff;
    margin: 20px 0;
    line-height: 22px;

  }

  .contact {

    font-weight: 500;
    font-size: 16px;

    letter-spacing: 0%;
    color: #fff;

  }

  .title {

    font-weight: 600;
    font-size: 16px;

    letter-spacing: 0%;
    color: #FFFFFF;
    margin-bottom: 20px;


  }

  .list {
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;

    letter-spacing: 0%;
    color: #8E8E92;
    margin-bottom: 16px;
  }

  .list:hover {
    color: #fff;
  }

}

@media (max-width: 768px) {
  .footer {
    background: #151517;
    // height: 460px;
    padding: 0 15px;
    padding-bottom: 106px;
    padding-top: 30px;

    .name1 {

      font-weight: 400;
      font-size: 30px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #fff;
      margin-bottom: 10px;

    }

    .name2 {

      font-weight: 600;
      font-size: 24px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #fff;
      margin: 20px 0;

    }

    .contact {

      font-weight: 500;
      font-size: 14px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #fff;
      margin-bottom: 15px;

    }

    .title {

      font-weight: 600;
      font-size: 16px;
      line-height: 100%;

      color: #FFFFFF;
      margin-bottom: 20px;


    }

    .list {

      font-weight: 400;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #8E8E92;
      margin-bottom: 15px;
    }

  }
}
</style>