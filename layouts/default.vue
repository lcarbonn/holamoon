<template>
        <md-app md-mode="reveal">
            <md-app-toolbar class="md-primary">
                <Toolbar v-if='parametres'
                         :titre="parametres.titre"
                         @setVisible="setVisible" />
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <Drawer @setVisible="setVisible" />
            </md-app-drawer>

            <md-app-content>
                <Color v-if='parametres' 
                    :primaryColor="parametres.primaryColor" 
                    :accentColor="parametres.accentColor"
                    :theme="parametres.theme"/>
                <nuxt />
                <Loader :isLoading="isLoading"></Loader>
                <Snackbar />
            </md-app-content>
        </md-app>
</template>

<script>

import Loader from '@/components/base/Loader'
import Snackbar from '@/components/base/Snackbar'
import Toolbar from '@/components/base/Toolbar'
import Drawer from '@/components/base/Drawer'
import Color from '@/components/base/Color'

export default {
    name: 'Overlap',
    components: {
        Loader,
        Snackbar,
        Toolbar,
        Drawer,
        Color
    },
    data() {
        return {
            menuVisible: false
        }
    },
    computed: {
        parametres() {
            return this.$store.getters['application/parametres']
        },
        isLoading() {
            return this.$store.getters['application/isLoading']
        }
    },
    methods: {
        setVisible() {
            this.menuVisible = !this.menuVisible;
        }
    }
}
</script>
<style>
div#__nuxt,
#__layout,
#__layout > div,
#app {
    min-height: 100vh;
}
html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
/* .md-app {
    border: 1px solid rgba(#000, 0.12);
} */

.md-drawer {
    width: 230px;
    max-width: calc(100vw - 130px);
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.md-toolbar + .md-toolbar {
    margin-top: 16px;
}

.n-link {
    text-decoration: none !important;
}
</style>
