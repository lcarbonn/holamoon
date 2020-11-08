<template>
    <md-table :value="articles"
              @md-selected="onSelect"
              :md-selected-value.sync="selected">

        <md-table-empty-state md-label="Il n'y a pas d'articles">
        </md-table-empty-state>

        <md-table-row slot="md-table-row"
                      slot-scope="{ item }"
                      md-selectable="multiple">
            <md-table-cell md-label="Auteur">{{ item.auteur }}</md-table-cell>
            <md-table-cell md-label="Contenu"
                           class="contenu">{{ item.contenu}}
                <md-tooltip md-direction="top">{{ item.contenu}}</md-tooltip>
            </md-table-cell>
            <md-table-cell md-label="Date création">{{ getDate(item.dateCreation)}}</md-table-cell>
            <md-table-cell md-label="Date publication">{{ getDate(item.datePublication)}}</md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>

import { utils } from '~/mixins/utils';

export default {
    name: 'ListArticles',
    mixins: [utils],
    data: () => ({
        selected: [],
    }),
    props: {
        articles: {
            type: Array,
            required: true
        }
    },
    watch: {
        articles() {
            this.selected = this.articles.filter(article => !article.datePublication)
        },
    },
    methods: {
        onSelect(items) {
            this.selected = items
            this.$emit("onSelect", this.selected)
        },
    }
}
</script>
