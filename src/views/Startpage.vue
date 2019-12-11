<template>

    <div class = "IntroText">
    <div class="welcomeText">Welcome to Indie Burgers</div>

        <section class = "welcomeSection">
            <div>
                <h1>Welcome to Krafty Burgers</h1>
                We are a restaurant dedicated to providing exactly the burger that you want<br>
                Here, we love cows <3
                <button id = "firstButton"><router-link to="/">Go to orderings</router-link></button>
            </div>
        </section>
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
    .welcomeText{
        text-align: center;
        font-size: 3em;
        font-family: AppleGothic;
        padding-top: 5em;
        padding-bottom: 1em;

    }
    .IntroText {
        background-image: url("https://i.pinimg.com/originals/ec/7c/99/ec7c9939f38e474f1050d59e0fc87a95.jpg");
        overflow: hidden;
        background-size: cover;
        height: 50em;
        border: 5px solid black;
        padding-left: 20em;
        padding-right: 20em;
        font-family: "Marker Felt";

    }
    .welcomeSection {
        text-align: center;
        border: black solid 5px;
        color: black;
        background-color: bisque;
        border-radius: 50px;
    }
    #firstButton {
        text-align: center;
        font-size: 15px;
        border-radius: 40%;
        border: 2px solid black;
        padding: 15px 20px;
        margin-top: 5%;
        margin-left: 42%;
        margin-right: 45%;
        margin-bottom: 2em;
        background-color: beige;
        -webkit-transition-duration: 0.4s;  /* transition to color */
        transition-duration: 0.4s;
        display: block;
    }
    #firstButton:hover{
        background-color: chocolate;
        color:white
    }

</style>