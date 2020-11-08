<template>
    <div md-layout>
        <md-toolbar class="md-primary">
            <h3 class="md-title"><i>{{lettre.titre}}</i></h3>
        </md-toolbar>
        <FormulaireLettre md-layout-item
                          :titre="lettre.titre"
                          :numero="lettre.numero"
                          :token="lettre.token"
                          :hashtag="lettre.hashtag"
                          :email="lettre.email"
                          @sauverLettre="sauverLettre"
                          @supprimerLettre="supprimerLettre"
                          @envoyerLettre="envoyerLettre"
                          @getArticlesFromSlack="getArticlesFromSlack">
        </FormulaireLettre>

        <ListArticles :articles="articles"
                      :selected="selected"
                      @onSelect="onSelect" />
    </div>
</template>

<script>

import { utils } from '~/mixins/utils';
import FormulaireLettre from '~/components/domain/lettres/formulaire-lettre'
import ListArticles from '~/components/domain/articles/liste-des-articles'

const toLower = text => {
    return text.toString().toLowerCase()
}

export default {
    name: 'LettreDetail',
    mixins: [utils],
    components: {
        FormulaireLettre,
        ListArticles
    },
    data: () => ({
        search: "",
        selected: []
    }),
    props: {
        articles: {
            type: Array,
            required: true
        },
        lettre: {
            type: Object,
            required: true,
            default: {
                "hashtag": "",
            }
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
        },
        getLettreASauver(lettreASauver) {
            this.lettre.titre = lettreASauver.titre;
            this.lettre.numero = lettreASauver.numero;
            this.lettre.hashtag = lettreASauver.hashtag;
            this.lettre.email = lettreASauver.email;
            this.lettre.token = lettreASauver.token;
        },
        sauverLettre(lettreASauver) {
            this.getLettreASauver(lettreASauver);
            this.$store.dispatch("lettres/sauverLettre", this.lettre);
        },
        supprimerLettre() {
            this.$store.dispatch("lettres/supprimerLettre", this.lettre);
        },
        envoyerLettre() {
            const payload = {
                "lettre": this.lettre,
                "articles": this.selected,
            }
            this.$store.dispatch("lettres/envoyerLettre", payload);
            this.$store.dispatch("articles/publierArticles", payload);
        },
        getArticlesFromSlack() {
            this.$store.dispatch("articles/getArticlesFromSlack");
        }
    }
}
</script>
