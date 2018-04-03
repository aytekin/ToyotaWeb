define(function (require) {
    "use strict";

    var AppRouter = Backbone.Router.extend({
        initialize: function () {
            require('utilities'); //Utility fonksiyonlarını her yerde kullanmak için
        },
        routes: {
            '': 'city'  ,
            'rfentry':'rfentry',
            'place':'place',
            'company':'company',
            'user':'user'

        },
        city: function () {
            var CityView = require('components/city/CityView');
            showView(new CityView());
        },

        place: function () {
            var PlaceView = require('components/place/PlaceView');
            showView(new PlaceView());
        },
        rfentry:function () {
            var RfentryView = require('components/rfentry/RfentryView');
            showView(new RfentryView());
        },
        company:function () {
            var CompanyView = require('components/company/CompanyView');
            showView(new CompanyView());
        },
        user:function () {
            var UserView = require('components/userRegister/UserRegisterView');
            showView(new UserView());
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