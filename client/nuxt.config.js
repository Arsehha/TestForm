const is_prod = true

const port = 4000
const link = is_prod ? 'http://31.129.98.120' : 'http://localhost'
const serverLink = link + ':' + port + '/api/'

export default {
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    title: 'client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  server: {
    port: 3000
  },

  css: [
    "assets/main.css",
    "assets/markupLayout/index.css"
  ],

  plugins: [
    { src: `@/plugins/v-mask`}
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  axios: {
    baseURL: '/',
    proxy: true
  },

  proxy: {
    '/api/': {target: serverLink, pathRewrite: {'^/api/': ''}},
  },

  pwa: {
    manifest: {
      lang: 'ru'
    }
  },

  build: {
  }
}
