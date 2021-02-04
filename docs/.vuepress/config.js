const { description } = require('../../package')

module.exports = {
  title: 'Fastify Api',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  // configureWebpack: {
  //   output: {
  //     publicPath: '/docs'
  //   }
  // },
  themeConfig: {
    smoothScroll: true,
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {},
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'Config',
            link: '/config/'
          },
          {
            text: 'Fastify',
            link: 'https://fastify.io'
          },
          {
            text: 'VuePress',
            link: 'https://v1.vuepress.vuejs.org'
          }
        ],
        sidebar: {
          '/guide/': [
            {
              title: 'Guide',
              collapsable: false,
              children: [
                '',
                'using-vue',
              ]
            }
          ],
        }
      },
      '/pt-BR/': {
        selectText: 'Línguas',
        label: 'Português',
        ariaLabel: 'Línguas',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {},
        nav: [
          {
            text: 'Guia',
            link: '/pt-BR/guide/',
          },
          {
            text: 'Config',
            link: '/pt-BR/config/'
          },
          {
            text: 'Fastify',
            link: 'https://fastify.io'
          },
          {
            text: 'VuePress',
            link: 'https://v1.vuepress.vuejs.org'
          }
        ],
        sidebar: {
          '/pt-BR/guide/': [
            {
              title: 'Guia',
              collapsable: false,
              children: [
                '',
                'using-vue',
              ]
            }
          ],
        }
      },
    },
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Fastify',
      description: 'Vue-powered Static Site Generator'
    },
    '/pt-BR/': {
      lang: 'pt-BR',
      title: 'Fastify',
      description: 'Vue-powered Static Site Generator'
    }
  }
}
