define(function (require) {
    "use strict";

    var AppRouter = Backbone.Router.extend({
        initialize: function () {
            require('utilities'); //Utility fonksiyonlarını her yerde kullanmak için
        },
        routes: {
            '':'home',
            'home':'home',
            'city': 'city'  ,
            'rfentry':'rfentry',
            'place':'place',
            'company':'company',
            'register':'register',
            'epermit':'epermit',
            'accsesCheck':'accsesCheck',
            'user':'user',
            'epconf':'epconf',
            'wseconf':'wseconf',
            'report':'report',
            'accountConfirmation':'accountConfirmation',
            'login':'login'
        },
        home: function () {
            var HomeView = require('components/home/HomeView');
            showView(new HomeView());
        },
        login: function () {
            var LoginView = require('components/userLogin/LoginView');
            showView(new LoginView());
        },
        city: function () {
            var CityView = require('components/city/CityView');
            showView(new CityView());
        },
        accountConfirmation: function () {
            var AccountView = require('components/accountConfirmation/AccountConfirmationView');
            showView(new AccountView());
        },
        report: function () {
            var ReportView = require('components/report/ReportView');
            showView(new ReportView());
        },
        accsesCheck: function () {
            var AccsesCheckView = require('components/accsesCheck/AccsesCheckView');
            showView(new AccsesCheckView());
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