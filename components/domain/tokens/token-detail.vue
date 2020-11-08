<template>
    <div md-layout>
        <md-toolbar class="md-primary">
            <h3 class="md-title"><i>{{tokenCourant.slackName}}</i></h3>
        </md-toolbar>
        <FormulaireToken md-layout-item
                         :slackName="tokenCourant.slackName"
                         :accessToken="tokenCourant.accessToken"
                         @sauverToken="sauverToken"
                         @supprimerToken="supprimerToken">
        </FormulaireToken>
    </div>
</template>

<script>

import { utils } from '~/mixins/utils';
import FormulaireToken from '~/components/domain/tokens/formulaire-token'

const toLower = text => {
    return text.toString().toLowerCase()
}

export default {
    name: 'TokenDetail',
    mixins: [utils],
    components: {
        FormulaireToken
    },
    data: () => ({
        search: "",
        token: {
            "accessToken": "",
        }
    }),
    props: {
        tokenCourant: {
            type: Object,
            required: true
        }
    },
    methods: {
        getTokenASauver(tokenASauver) {
            this.tokenCourant.slackName = tokenASauver.slackName;
            this.tokenCourant.accessToken = tokenASauver.accessToken;
        },
        sauverToken(tokenASauver) {
            this.getTokenASauver(tokenASauver);
            this.$store.dispatch("tokens/sauverToken", this.tokenCourant);
        },
        supprimerToken() {
            this.$store.dispatch("tokens/supprimerToken", this.tokenCourant);
        }
    }
}
</script>
