<template>

    <div class="md-layout md-gutter md-alignment-top-left">
        <FormulaireMail :content="content"
                        md-layout-item
                        @sauverMail="sauverMail"
                        class="md-card cent">
        </FormulaireMail>
    </div>

</template>

<script>
import { utils } from '~/mixins/utils';
import FormulaireMail from '~/components/domain/mail/formulaire-mail'

export default {
    middleware: 'authorized',
    mixins: [utils],
    components: {
        FormulaireMail
    },
    mounted() {
        this.$store.dispatch("mail/getMail");
    },
    computed: {
        content() {
            let content = "";
            let template = this.$store.getters['mail/template']
            if (!!template?.content) content = template.content
            return content
        }
    },
    methods: {
        sauverMail(content) {
            this.$store.dispatch("mail/sauverMail", content);
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
