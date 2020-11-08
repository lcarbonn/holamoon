<template>
    <div class="md-toolbar-row">
        <md-button class="md-icon-button"
                   @click="setVisible">
            <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">
            <n-link to="/"
                    class="md-title n-link">{{titre}}</n-link>
        </span>
    </div>
</template>

<script>
export default {
    name: "toolbar",
    props: {
        titre: {
            type: String,
            default() {
                return ""
            }
        }
    },
    methods: {
        setVisible() {
            this.$emit('setVisible')
        }
    }
}
</script>