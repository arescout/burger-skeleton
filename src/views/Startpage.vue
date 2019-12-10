<template>
    <div class="IntroText">
        <button v-on:click="switchLang()">{{uiLabels.language}}</button>
        <div class="welcomeText">Här är en hejtext</div>
        <button><router-link to="/">Go to orderings</router-link></button>
    </div>
</template>

<script>

    //import methods and data that are shared between ordering and kitchen views
    import sharedVueStuff from '@/components/sharedVueStuff.js'

    /* instead of defining a Vue instance, export default allows the only
    necessary Vue insta */

        export default {
            name: "Startpage"
        }
        mixins: [sharedVueStuff]
</script>

<style scoped>
    .IntroText {
        background-image: url("https://i.pinimg.com/originals/ec/7c/99/ec7c9939f38e474f1050d59e0fc87a95.jpg");
    }
</style>