<template>
    <div class = "IntroText">
    <div class="welcomeText">Här är en hejtext</div>
    <button><router-link to="/">Go to orderings</router-link></button>
    </div>
</template>

<script>
    export default {
        name: "Startpage"
    }
</script>

<style scoped>
    .IntroText {
        background-image: url("https://i.pinimg.com/originals/ec/7c/99/ec7c9939f38e474f1050d59e0fc87a95.jpg");
    }
</style>