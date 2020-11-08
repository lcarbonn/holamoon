<template>
    <div>

        <md-toolbar class="md-primary">
            <md-button class="md-primary"
                       @click="ajouterToken">
                <md-icon>add</md-icon> Ajouter un Token Slack
            </md-button>
        </md-toolbar>

        <md-list>
            <md-list-item v-for="(item, index) in lesTokens"
                          :item="item"
                          :index="index"
                          :key="item.id"
                          @click="select(item)"
                          :class="{ active: isSelected(item) }">
                <span class="md-list-item-text">{{ item.slackName }}</span>
            </md-list-item>

        </md-list>
    </div>
</template>

<script>
const toLower = text => {
    return text.toString().toLowerCase()
}

const searchByTitre = (items, term) => {
    if (term) {
        return items.filter(item => toLower(item.titre).includes(toLower(term)))
    }

    return items
}

export default {
    name: 'ListeDesTokens',
    data: () => ({
        search: "",
    }),
    props: {
        lesTokens: {
            type: Array,
            required: true
        },
        tokenCourant: {
            type: Object,
        }
    },
    methods: {
        select(item) {
            this.$emit('selectToken', item)
        },
        isSelected(item) {
            if (this.tokenCourant) {
                return item.id ? this.tokenCourant.id === item.id : false
            }
        },
        ajouterToken() {
            this.$emit('ajouterToken');
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    padding-top: 0px;
    background-color: var(--md-theme-default-primary);
}
.active {
    background-color: var(--md-theme-default-primary);
}
</style>