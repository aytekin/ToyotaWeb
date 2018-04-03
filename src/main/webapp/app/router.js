define(function (require) {
    "use strict";

    var AppRouter = Backbone.Router.extend({
        initialize: function () {
            require('utilities'); //Utility fonksiyonlarını her yerde kullanmak için
        },
        routes: {
            '': 'city'  ,
            'rfentry':'rfentry',
            'place':'place'

        },
        city: function () {
            var CityView = require('components/city/CityView');
            showView(new CityView());
        },

        place: function () {
            var CityView = require('components/place/PlaceView');
            showView(new CityView());
        },
        rfentry:function () {
            var CityView = require('components/rfentry/RfentryView');
            showView(new CityView());
        }
    });

    var initialize = function () {
        window.$router = new AppRouter;
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});