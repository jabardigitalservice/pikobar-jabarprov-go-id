require('dotenv').config()

const APP_TITLE = 'Pikobar - Pusat Informasi dan Koordinasi COVID-19 Jawa Barat'
export default {
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_PUBLIC_VAPID_KEY: process.env.FIREBASE_PUBLIC_VAPID_KEY,
    APP_TITLE,
    URL: process.env.URL,
    WMS_API_KEY: process.env.WMS_API_KEY,
    WMS_BASE_URL: process.env.WMS_BASE_URL,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
  },
  router: {
    prefetchLinks: false
  },
  generate: {
    fallback: true,
    interval: 100,
    exclude: [
      /^\/(\bdata\b).*$/,
      /^\/(\bdonate\b).*$/
    ],
    async routes () {
      const genFn = await import('./routes-generator').then(m => m ? m.default || m : null)
      return genFn ? genFn() : []
    }
  },
  server: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: APP_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'url', name: 'url', content: process.env.URL },
      { hid: 'og:title', property: 'og:title', content: APP_TITLE },
      { hid: 'og:description', property: 'og:description', content: process.env.npm_package_description },
      { hid: 'og:url', property: 'og:url', content: process.env.URL },
      { hid: 'og:image', property: 'og:image', content: `${process.env.URL}/logo.jpg` },
      { hid: 'og:site_name', property: 'og:site_name', content: APP_TITLE },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@jabardigital' },
      { hid: 'twitter:title', name: 'twitter:title', content: APP_TITLE },
      { hid: 'twitter:description', name: 'twitter:description', content: process.env.npm_package_description },
      { hid: 'twitter:image', name: 'twitter:image', content: `${process.env.URL}/logo.jpg` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'rgb(0,200,83)' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/stylesheet/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/numbro.js' },
    { src: '~/plugins/initial-data.js', mode: 'client' },
    { src: '~/plugins/service-worker.js', mode: 'client' },
    '~/plugins/vuex-router-sync.js',
    { src: '~/plugins/vue-leaflet.js', ssr: false },
    { src: '~/plugins/vue-lazyload.js', mode: 'client' },
    { src: '~/plugins/vue-carousel.js', mode: 'client' },
    { src: '~/plugins/vue-rangedate-picker', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/fontawesome', {
      component: 'FontAwesomeIcon'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-leaflet'
  ],
  pwa: {
    workbox: {
      dev: true,
      autoRegister: false,
      swURL: 'service-worker.js'
    },
    themeColor: '#399F4F',
    manifest: {
      name: 'Pikobar | Jawa Barat',
      background_color: '#399F4F',
      display: 'standalone',
      orientation: 'portrait'
    }
  },
  purgeCSS: {
    whitelistPatterns: [
      /(^|\.)fa-/, /-fa($|\.)/,
      /(^|\.)leaflet-/,
      /(^|\.)vue-slider-/
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      const htmlLoader = config.module.rules.find(rule => rule.test.test('html'))
      if (htmlLoader) {
        console.log(htmlLoader)
      } else {
        config.module.rules.push({
          test: /\.html$/,
          use: ['html-loader']
        })
      }
    }
  }
}
