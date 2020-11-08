<template>
  <div class="login">
        <firebase-ui />
  </div>
</template>

<script>
import FirebaseUi from '~/components/base/FirebaseUi';

export default {
  middleware: 'notAuthenticated',
  name: 'Login',
  components: {
    FirebaseUi
  }
}
</script>
