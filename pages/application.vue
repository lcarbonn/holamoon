<template>

    <div class="md-layout md-gutter md-alignment-top-left">
        <FormulaireApplication v-if='parametres'
                               :titre="parametres.titre"
                               :theme="parametres.theme"
                               :primaryColor="parametres.primaryColor"
                               :accentColor="parametres.accentColor"
                               md-layout-item
                               @sauverParametres="sauverParametres"
                               class="md-card cent">
        </FormulaireApplication>
    </div>

</template>

<script>
import { utils } from '~/mixins/utils';
import FormulaireApplication from '~/components/domain/application/formulaire-application'

export default {
    middleware: 'authorized',
    mixins: [utils],
    components: {
        FormulaireApplication
    },
    mounted() {
        this.$store.dispatch("application/getParametres");
    },
    computed: {
        parametres() {
            return this.$store.getters['application/parametres']
        }
    },
    methods: {
        sauverParametres(parametres) {
            this.$store.dispatch("application/sauverParametres", parametres);
        }
    }

}
</script>

<style lang="scss" scoped>
.cent {
    padding-top: 0;
    width: calc(100% - 32px);
}
</style>
