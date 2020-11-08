<template>
    <div>
        <md-toolbar class="md-transparent"
                    md-elevation="0">
            Navigation
        </md-toolbar>

        <md-list>
            <md-list-item to="/" @click="setVisible">
                <md-icon>home</md-icon>
                <span class="md-list-item-text">Accueil</span>
            </md-list-item>
            <md-list-item md-expand
                          :md-expanded.sync="expand"
                          v-if="isAuthenticated && isAuthorized">
                <md-icon>settings</md-icon>
                <span class="md-list-item-text n-link">Paramètres</span>
                <md-list slot="md-expand">
                    <md-list-item to="/tokens" md-inset
                                  @click="setVisible">
                        <md-icon>share</md-icon>
                        <span class="md-list-item-text">Slack Tokens</span>
                    </md-list-item>
                    <md-list-item to="/mail" md-inset
                                  @click="setVisible">
                        <md-icon>mail</md-icon>
                        <span class="md-list-item-text">Template Mail</span>
                    </md-list-item>
                    <md-list-item to="/application" md-inset
                                  @click="setVisible">
                        <md-icon>settings</md-icon>
                        <span class="md-list-item-text">Application</span>
                    </md-list-item>
                </md-list>
            </md-list-item>
            <md-list-item to="/logout" v-if="isAuthenticated"
                          @click="setVisible">
                <md-icon>exit_to_app</md-icon>
                <span class="md-list-item-text">Déconnexion</span>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
export default {
    name: "drawer",
    data() {
        return {
            expand: false
        }
    },
    methods: {
        setVisible() {
            this.$emit('setVisible')
            this.expand = false
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated'];
        },
        isAuthorized() {
            return this.$store.getters['auth/isAuthorized'];
        },
    },

}
</script>