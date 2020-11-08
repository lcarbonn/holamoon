<template>
    <div>

        <md-toolbar class="md-primary">
            <md-button class="md-primary"
                       @click="ajouterLettre">
                <md-icon>add</md-icon> Ajouter une Lettre
            </md-button>
        </md-toolbar>

        <md-list>
            <md-list-item v-for="(item, index) in lesLettres"
                          :item="item"
                          :index="index"
                          :key="item.id"
                          @click="select(item)"
                          :class="{ active: isSelected(item) }">
                <span class="md-list-item-text">{{ item.titre }}</span>
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
    name: 'ListeDesLettres',
    data: () => ({
        search: "",
    }),
    props: {
        lesLettres: {
            type: Array,
            required: true
        },
        lettreCourante: {
            type: Object,
        }
    },
    methods: {
        select(item) {
            this.$emit('selectLettre', item)
        },
        isSelected(item) {
            if (this.lettreCourante) {
                return item.id ? this.lettreCourante.id === item.id : false
            }
        },
        ajouterLettre() {
            this.$emit('ajouterLettre');
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