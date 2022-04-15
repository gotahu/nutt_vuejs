const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/other/nutt/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/main.scss";'
      }
    }
  },
  pwa: {
    name: "NUTT",
    themeColor: "#006e4f",
    msTileColor: "006e4f",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    iconPaths: {
      favicon32: './img/icons/favicon-32x32.png',
      appleTouchIcon: './img/icons/apple-touch-icon.png',
    }
  }
})
