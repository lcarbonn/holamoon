<template>
    <style>
    :root {
        --md-theme-default-primary: {{ primaryColor }};
        --md-theme-default-primary-on-background: {{ primaryColor }};
        --md-theme-default-accent: {{ accentColor }};

        --md-theme-dark-primary: {{ primaryColor }};
        --md-theme-dark-primary-on-background: {{ primaryColor }};
        --md-theme-dark-accent: {{ accentColor }};
    }
    </style>
</template>

<script>
export default {
    name: "Color",
    props: {
        primaryColor: {
            type: String,
            default() {
                return "#ea148d"
            }
        },
        accentColor: {
            type: String,
            default() {
                return "#ffff00"
            }
        },
        theme: {
            type: String,
            default() {
                return 'default'
            }
        }
    },
    mounted() {
        this.$material.theming.theme = this.theme
    }
}
</script>