<template>
    <div class="unauthorized">
        <p>
            You are <em>authenticated</em> as
            <strong>{{email}}</strong> but you are not <em>authorized</em> to access this website resources for now.
            <br />You can go on your way.
        </p>
    </div>
</template>

<script>
export default {
    middleware: ['authenticated', 'notAuthorized'],
    computed: {
        email() {
            return this.$fireAuthObj().currentUser.email
        }
    },
    async mounted() {
        try {
            const idTokenResult = await this.$fireAuthObj().currentUser.getIdTokenResult()
        } catch (e) {
            // console.log(e)
        }
    }
};
</script>