<template>
    <md-snackbar :md-active.sync="isASnackbarMessage"
                 md-position="center"
                 :md-duration="4000">
        <span>{{snackbarMessage}}</span>
    </md-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',

    computed: {
        snackbarMessage() {
            return this.$store.getters['application/snackbarMessage']
        },
        isASnackbarMessage: {
            get() {
                return this.$store.getters['application/snackbarMessage'] != null
            },

            set(fullName) {
                this.$store.dispatch("application/setSnackbarMessage", { message: null }, { root: true });
            }
        }
    }

}
</script>
