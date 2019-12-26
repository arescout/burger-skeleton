<template>
    <div id = "startPage">
    <div class = "IntroText">
        <button class="routerButton" v-on:click="switchLang()"><img src= width=20px>
            {{uiLabels.language }} {{uiLabels.flagOnButton }} </button>
    <div class="welcomeText">{{uiLabels.welcomeShort}}</div>
        <section class = "welcomeSection">
            <div class="whereToEat" >
                <div class="welcomelong">{{uiLabels.welcomeTextBox}}</div>
                <button class = "eatHereButton" v-on:click="whereToEatFuncHere()"><router-link to="/ordering" class="routerButton">{{uiLabels.eatHere}}</router-link></button>
                <button class = "takeAwayButton" v-on:click="whereToEatFuncAway()"><router-link to="/ordering" class="routerButton">{{uiLabels.eatAway}}</router-link></button>
            </div>
        </section>
    </div>
    </div>
</template>

<script>
    import sharedVueStuff from '@/mixins/sharedVueStuff.js'

    export default {
        name: 'StartingPage',
        components: {
        },
        mixins: [sharedVueStuff], // include stuff that is used in both
                                  // the ordering system and the kitchen
        data: function() { //Not that data is a function!
            return {
            }
        },
        computed: {
            eatHere: function () {
                return this.$store.state.eatHere;
            },
        },
        created: function () {
            this.$store.state.socket.on('orderNumber', function (data) {
                this.orderNumber = data;
            }.bind(this));
        },
        methods: {
            whereToEatFuncHere: function () {
                this.$store.commit('setEatHere', true);
            },
            whereToEatFuncAway: function () {
                this.$store.commit('setEatHere', false);

            }
        }
    }

</script>

<style scoped>
    #startPage{
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        hight:100%;
        display:block;
    }
    .welcomeText{
        text-align: center;
        font-size: 3em;
        padding-top: 1em;
        padding-bottom: 1em;

    }
    .IntroText {
        background-image: url("https://i.pinimg.com/originals/ec/7c/99/ec7c9939f38e474f1050d59e0fc87a95.jpg");
        overflow: hidden;
        background-size: cover;
        height: 50em;
        border: 1em solid black;
        padding-left: 20em;
        padding-right: 20em;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;

    }
    .welcomeSection {
        text-align: center;
        border: black solid 0.5em;
        color: black;
        background-color: bisque;
        border-radius: 50px;
    }
    .whereToEat{
        display: grid;
        grid-template-columns: repeat(4, 2fr);
        grid-gap: 1.1rem;
    }
    .welcomelong{
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 2;
        grid-row-end: 3;
        font-size: 1.3em;
        padding-right: 2em;
        padding-left: 2em;
    }
    .whereToEat button:hover {
        background-color: #ffd4a4;
        color: var(--secondary-text-color);
        cursor: pointer;

    }
    .whereToEat a{
        display: block;
    }
    .eatHereButton{
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 4;
        grid-row-end: 5;
        font-size: 1em;
        border-radius: 25px;
        border: 0.2em solid black;
        background-color: beige;
        margin-bottom: 2em;
    }
    .takeAwayButton{
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 4;
        grid-row-end: 5;
        font-size: 1em;
        border-radius: 25px;
        border: 0.2em solid black;
        background-color: beige;
        margin-bottom: 2em;
    }
    .routerButton {
        text-decoration: none;
        text-transform: uppercase;
        color: black;

    }
</style>
