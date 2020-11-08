<template>

    <div class="md-layout md-gutter md-alignment-top-left">
        <ListeDesLettres :lesLettres="lettres"
                         @selectLettre="setLettreCourante"
                         @ajouterLettre="ajouterLettre"
                         :lettreCourante="lettreCourante"
                         md-layout-item
                         class="md-card trente">
        </ListeDesLettres>

        <LettreDetail v-if='lettreCourante'
                      :articles="articles"
                      :lettre="lettreCourante"
                      md-layout-item
                      class="md-card soixante-dix"></LettreDetail>
    </div>

</template>

<script>
import { utils } from '~/mixins/utils';
import ListeDesLettres from '~/components/domain/lettres/liste-des-lettres'
import LettreDetail from '~/components/domain/lettres/lettre-detail'

export default {
    middleware: 'authorized',
    mixins: [utils],
    components: {
        ListeDesLettres,
        LettreDetail
    },
    methods: {
        setLettreCourante(lettreCourante) {
            this.$store.dispatch("lettres/setLettreCourante", lettreCourante);
            this.$store.dispatch("articles/getArticles", lettreCourante.id);
        },
        ajouterLettre() {
            this.$store.dispatch("lettres/createLettre");
            this.$store.dispatch("articles/resetArticles");
        }
    },
    mounted() {
        this.$store.dispatch("application/getParametres");
        this.$store.dispatch("lettres/getLettres");
    },
    computed: {
        lettres() {
            return this.$store.getters['lettres/listLettres']
        },
        lettreCourante() {
            return this.$store.getters['lettres/lettreCourante']
        },
        articles() {
            return this.$store.getters['articles/listArticles']
        }
    }
}
</script>

<style lang="scss" scoped>
.trente {
    padding-top: 0;
    width: calc(25% - 32px);
}
.soixante-dix {
    width: calc(75% - 32px);
}
</style>
