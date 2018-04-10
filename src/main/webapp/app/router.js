define(function (require) {
    "use strict";

    var AppRouter = Backbone.Router.extend({
        initialize: function () {
            require('utilities'); //Utility fonksiyonlarını her yerde kullanmak için
        },
        routes: {
            'city': 'city'  ,
            'rfentry':'rfentry',
            'place':'place',
            'company':'company',
            'register':'register',
            'epermit':'epermit',
            'accsesCheck':'accsesCheck',
            'user':'user',
            'epconf':'epconf',
            'wseconf':'wseconf'
        },
        city: function () {
            var CityView = require('components/city/CityView');
            showView(new CityView());
        },
        accsesCheck: function () {
            var CityView = require('components/accsesCheck/AccsesCheckView');
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
        register:function () {
            var UserView = require('components/userRegister/UserRegisterView');
            showView(new UserView());
        },
        epermit:function () {
            var EpermitView = require('components/epermit/EpermitView');
            showView(new EpermitView());
        },
        epconf:function () {
            var EpConfView = require('components/epconfirmation/epermitConfirmationView');
            showView(new EpConfView());
        },
        wseconf:function () {
            var wseconfView = require('components/wseducationconfirm/wseducationConfirmView');
            showView(new wseconfView());
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