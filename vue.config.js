const { defineConfig } = require('@vue/cli-service')
require('dotenv').config();
module.exports = defineConfig({
  chainWebpack: config => {
    // config.target("node")
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Dapplink Bridge'
        return args
      })
    config.externals.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
    }
  },
  configureWebpack: {
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
      hints: false
    }
  },
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import '@/assets/global/css/global.scss';`
      }
    }
  },
  devServer: {
    // 设置重写
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 如果接口路径有特殊的前缀，可以在这里进行修改
        }
      }
    },
  },
})
