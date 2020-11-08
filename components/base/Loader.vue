<template>
    <div v-if="isLoading"
         class="loading">
        <md-progress-spinner :md-diameter="100"
                             :md-stroke="10"
                             md-mode="indeterminate"></md-progress-spinner>
    </div>
</template>
<script>

export default {
    name: 'Loader',
    props: {
        isLoading: {
            type: Boolean,
            default() {
                return false
            }
        }
    }
}
</script>

<style>
.loading {
    position: fixed;
    z-index: 999;
    height: 100px;
    width: 100px;
    overflow: visible;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.loading:before {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.3); */
}
</style>

