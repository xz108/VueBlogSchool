const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 8888, //设置端口号
    host: 'localhost'
  },
  outputDir: 'dist',   //打包的文件名，可以自己设置，默认是dist
  publicPath: './'
// assetsDir: 'static',
})

