'use strict';

// Stuff that is used both in the ordering system and in the kitchen

var sharedVueStuff = {
    data: function () {
        return {
            orders: {},
            uiLabels: {},
            ingredients: {},
            lang: "en",
            flag_sv: true,
            flag_en: false,
            lang_en: true,
            lang_sv: false
        }
    },
    created: function () {
        this.$store.state.socket.on('initialize', function (data) {
            this.orders = data.orders;
            this.uiLabels = data.uiLabels;
            this.ingredients = data.ingredients;
        }.bind(this));

        this.$store.state.socket.on('switchLang', function (data) {
            this.uiLabels = data;
        }.bind(this));

        this.$store.state.socket.on('currentQueue', function (data) {
            this.orders = data.orders;
            if (typeof data.ingredients !== 'undefined') {
                this.ingredients = data.ingredients;
            }
        }.bind(this));

        this.$store.state.socket.emit('fetchData', {});

    },
    methods: {
    switchLang: function () {
        if (this.lang === "en" && this.flag_en===false) {
            this.lang = "sv";
            this.flag_en = true;
            this.flag_sv = false;
            this.lang_sv = true;
            this.lang_en = false;
        } else {
            this.lang = "en";
            this.flag_sv = true;
            this.flag_en = false;
            this.lang_en = true;
            this.lang_sv = false;
        }
        this.$store.state.socket.emit('switchLang', this.lang);
    }
}
};

export default sharedVueStuff;