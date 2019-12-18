<template>
    <div class = "IntroText">
         <button class="routerButton" v-on:click="switchLang()"><img src=https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg width=20px>
         {{uiLabels.language }}</button>
    <div class="welcomeText">Welcome to Indie Burgers</div>
        <section class = "welcomeSection">
            <div class="whereToEat">
                <h1>Welcome to Krafty Burgers</h1>
                {{uiLabels.welcomeTextBox}}
                <button id = "eatHereButton" v-on:click="whereToEatFuncHere()"><router-link to="/ordering" class="routerButton">{{uiLabels.eatHere}}</router-link></button>
                <button id = "takeAwayButton" v-on:click="whereToEatFuncAway()"><router-link to="/ordering" class="routerButton">{{uiLabels.eatAway}}</router-link></button>
            </div>
        </section>
    </div>
</template>

<script>
    import sharedVueStuff from '@/components/sharedVueStuff.js'

    export default {
        name: 'StartingPage',
        components: {
        },
        mixins: [sharedVueStuff], // include stuff that is used in both
                                  // the ordering system and the kitchen
        data: function() { //Not that data is a function!
            return {
                eatHere:false,
                chosenIngredients: [],
                price: 0,
                orderNumber: "",
                category: 1
            }
        },
        created: function () {
            this.$store.state.socket.on('orderNumber', function (data) {
                this.orderNumber = data;
            }.bind(this));
        },
        methods: {
            whereToEatFuncHere: function () {
                this.eatHere=true;
            },
            whereToEatFuncAway: function () {
                this.eatHere=false;
            }
        }
    }


</script>

<style scoped>
    .welcomeText{
        text-align: center;
        font-size: 3em;
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
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;

    }
    .welcomeSection {
        text-align: center;
        border: black solid 5px;
        color: black;
        background-color: bisque;
        border-radius: 50px;
    }
    button {
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

    .routerButton {
        text-decoration: none;
        color: black;
    }

</style>
