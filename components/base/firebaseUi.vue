<template>
  <div id="firebaseui-auth-container" />
</template>

<script>
export default {
  name: 'Login',
  mounted: function() {
    if (process.browser) {
      let firebaseui = require("firebaseui");
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(this.$fireAuth);
      const url = window.location.href;
      const arr = url.split("/");
      const domain = `${arr[0]}//${arr[2]}`;
      const config = {
        signInOptions: [
          {
            provider: this.$fireAuthObj.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
            signInMethod: this.$fireAuthObj.EmailAuthProvider
              .EMAIL_LINK_SIGN_IN_METHOD,
            emailLinkSignIn: function() {
              return {
                // Additional state showPromo=1234 can be retrieved from URL on
                // sign-in completion in signInSuccess callback by checking
                // window.location.href.
                url: `${domain}/login`,
                // Custom FDL domain.
                dynamicLinkDomain: "lettredinfo.page.link",
                // Always true for email link sign-in.
                handleCodeInApp: true
                // Whether to handle link in iOS app if installed.
                // iOS: {
                //     bundleId: 'com.example.ios'
                // },
                // // Whether to handle link in Android app if opened in an Android
                // // device.
                // android: {
                //     packageName: 'com.example.android',
                //     installApp: true,
                //     minimumVersion: '12'
                // }
              };
            }
          }
        ],
        signInSuccessUrl: "/",
        tosUrl: "/tos",
        privacyPolicyUrl: "/privacy-policy",
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return true;
          },
          uiShown: function() {
          }
        }
      };
      ui.start("#firebaseui-auth-container", config);
    }
  }
};
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
<style lang="scss">
#firebaseui-auth-container {
    margin-top: 3rem;
}
</style>