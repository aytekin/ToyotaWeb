// RequireJS Configuration
requirejs.config({
    baseUrl: "app",
    paths: {
        'jquery': 'assets/lib/jquery1',
        'backbone': 'assets/lib/backbone',
        'handlebars': 'assets/lib/handlebars-v4.0.5',
        'underscore': 'assets/lib/underscore',
        'bootstrap': 'assets/lib/bootstrap.bundle.min',
        'utilities': 'utils/utility',
        'router': 'router',
        'validate':'assets/lib/jquery.validate.min',
        'clock':'assets/lib/jquery-clock-timepicker.min',

    },
    shim: {
        'backbone': {
            deps: ['jquery', 'underscore']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'validate':{
            deps:['jquery']
        },
        'clock':{
            deps:['jquery']
        }
    }
});

require([
    'backbone',
    'jquery',
    'underscore',
    'handlebars',
    'bootstrap',
    'validate',
    'clock'
], function (Backbone, Jquery, Underscore, Handlebars) {
    window.Handlebars = Handlebars;

    require(['router'], function (router) {
        router.initialize();
    });

});
