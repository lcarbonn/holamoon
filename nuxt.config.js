require('dotenv').config({ path: `./.env-${process.env.APP_ENV}` })

export default {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        '~/assets/css/custom-theme.scss',
        'quill/dist/quill.snow.css',
        'quill/dist/quill.core.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~/plugins/nuxt-quill-plugin.js', ssr: false }
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [

    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
        ['nuxt-vue-material', {
            theme: 'default',
            components: ['MdDrawer', 'MdRadio', 'MdMenu', 'MdContent', 'MdList', 'MdButton',
                'MdToolbar', 'MdIcon', 'MdApp', 'MdCard', 'MdTable', 'MdField', 'MdRipple',
                'MdEmptyState', 'MdCheckbox', 'MdProgress', 'MdSnackbar', 'MdSwitch', 'MdTooltip'
            ]
        }],
        ['@nuxtjs/firebase',
            {
                config: {
                    apiKey: process.env.FIREBASE_API_KEY,
                    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                    databaseURL: process.env.FIREBASE_DATABASE_URL,
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
                    appId: process.env.FIREBASE_APP_ID,
                    measurementId: process.env.FIREBASE_MEASUREMENT_ID
                },
                onFirebaseHosting: true,
                services: {
                    auth: {
                        persistence: 'local',
                        initialize: {
                            onAuthStateChangedAction: 'auth/onAuthStateChanged'
                        },
                        ssr: false
                    },
                    firestore: true,
                    analytics: true,
                }
            }
        ]
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: process.env.API_BASE_URL
    },
    /*
    ** Build configuration
    */
    build: {
        html: { minify: { collapseWhitespace: true } }
    },
    eslint: {
        /* module options */
        fix: true
    },
    env: {
    }
}
