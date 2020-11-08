<template>

    <div class="md-layout md-gutter md-alignment-top-left">
        <ListeDesTokens :lesTokens="tokens"
                        @selectToken="setTokenCourant"
                        @ajouterToken="ajouterToken"
                        :tokenCourant="tokenCourant"
                        md-layout-item
                        class="md-card trente">
        </ListeDesTokens>

        <TokenDetail v-if='tokenCourant'
                     :tokenCourant="tokenCourant"
                     md-layout-item
                     class="md-card soixante-dix"></TokenDetail>
    </div>

</template>

<script>
import { utils } from '~/mixins/utils';
import ListeDesTokens from '~/components/domain/tokens/liste-des-tokens'
import TokenDetail from '~/components/domain/tokens/token-detail'

export default {
    middleware: 'authorized',
    mixins: [utils],
    components: {
        ListeDesTokens,
        TokenDetail
    },
    methods: {
        setTokenCourant(tokenCourant) {
            this.$store.dispatch("tokens/setTokenCourant", tokenCourant);
        },
        ajouterToken() {
            this.$store.dispatch("tokens/createToken");
        }
    },
    mounted() {
        this.$store.dispatch("tokens/getTokens");
    },
    computed: {
        tokens() {
            return this.$store.getters['tokens/listTokens']
        },
        tokenCourant() {
            return this.$store.getters['tokens/tokenCourant']
        },
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
