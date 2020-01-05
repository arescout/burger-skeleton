<template>
    <div id="startPage">
        <div class="startPageWrapper">
            <button class="languageButton" v-on:click="switchLang()">
                {{uiLabels.language }}
            </button>
            <div class="welcomeText">{{uiLabels.welcomeShort}}</div>
            <div class="welcomeSection">
                <div class="whereToEat">
                    <div class="welcomeLong">{{uiLabels.welcomeTextBox}}</div>
                    <button class="eatHereButton" v-on:click="whereToEatFuncHere()">
                        <router-link to="/ordering" class="routerButton">{{uiLabels.eatHere}}</router-link>
                    </button>
                    <button class="takeAwayButton" v-on:click="whereToEatFuncAway()">
                        <router-link to="/ordering" class="routerButton">{{uiLabels.eatAway}}</router-link>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sharedVueStuff from '@/mixins/sharedVueStuff.js'

    export default {
        name: 'StartingPage',
        components: {},
        mixins: [sharedVueStuff], // include stuff that is used in both
                                  // the ordering system and the kitchen
        data: function () { //Not that data is a function!
            return {}
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
    /*GENERAL*/

    #startPage {
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
    }

    /*MAIN*/

    .startPageWrapper {
        background-image: url("https://i.pinimg.com/originals/ec/7c/99/ec7c9939f38e474f1050d59e0fc87a95.jpg");
        overflow: hidden;
        background-size: cover;
        height: 50rem;
        border: 1rem var(--border-color) solid;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
    }

    .welcomeText {
        text-align: center;
        font-size: 3rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    .welcomeSection {
        text-align: center;
        border: 0.5rem var(--border-color) solid;
        color: var(--primary-text-color);
        background-color: var(--primary-color);
        border-radius: 3rem;
        max-width: 35rem;
    }

    .whereToEat {
        display: grid;
        grid-template-columns: repeat(4, 2fr);
        grid-gap: 1.1rem;
    }

    .welcomeLong {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 2;
        grid-row-end: 3;
        font-size: 1.3rem;
        padding-right: 2rem;
        padding-left: 2rem;
    }

    .whereToEat a {
        display: block;
    }

    /*BUTTONS*/
    button:hover{
        cursor: pointer;
    }

    .whereToEat button:hover {
        background-color: var(--primary-dark-color);
        color: var(--secondary-text-color);
    }

    .eatHereButton {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 4;
        grid-row-end: 5;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 3rem;
        border: 0.2rem var(--border-color) solid;
        background-color: var(--primary-light-color);
        margin-bottom: 2rem;
        padding: 0.5rem;
    }

    .takeAwayButton {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 4;
        grid-row-end: 5;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 3rem;
        border: 0.2em var(--border-color) solid;
        background-color: var(--primary-light-color);
        margin-bottom: 2rem;
        padding: 0.5rem;
    }

    .languageButton {
        text-decoration: none;
        text-transform: uppercase;
        color: black;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 3rem;
        border: 0.2em var(--border-color) solid;
        background-color: var(--primary-light-color);
        padding: 0.5rem 1rem;
    }

    .routerButton {
        text-decoration: none;
        text-transform: uppercase;
        color: var(--border-color);
    }
</style>
