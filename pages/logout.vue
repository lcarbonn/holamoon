<template>
  <div class="logout">
  </div>
</template>

<script>

export default {
  middleware: ['authenticated'],
  async mounted() {
    try {
      await this.$fireAuth.signOut()
    } catch(e) {
      // console.log(e)
    }
    this.$router.push('/');
  }
}
</script>