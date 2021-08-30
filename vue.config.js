module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        common: '@/components/common',
        content: '@/components/content',
        network: '@/network',
        home: '@/views/home',
        exam: '@/views/exam',
        abouttheme: '@/views/about-theme',
        interpriseexam: '@/views/interprise-exam',
        score: '@/views/score',
        connect: '@/views/connect'
      }
    }
  },

  publicPath: './',
  lintOnSave: false
}
