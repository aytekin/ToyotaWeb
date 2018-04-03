// RequireJS Configuration
requirejs.config({
    baseUrl: "app",
    paths: {
        'jquery': 'assets/lib/jquery-3.2.0',
        'backbone': 'assets/lib/backbone',
        'handlebars': 'assets/lib/handlebars-v4.0.5',
        'underscore': 'assets/lib/underscore',
        'bootstrap': 'assets/lib/bootstrap.bundle.min',
        'utilities': 'utils/utility',
        'router': 'router'
    },
    shim: {
        'backbone': {
            deps: ['jquery', 'underscore']
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require([
    'backbone',
    'jquery',
    'underscore',
    'handlebars',
    'bootstrap'
], function (Backbone, Jquery, Underscore, Handlebars) {
    window.Handlebars = Handlebars;

    require(['router'], function (router) {
        router.initialize();
    });

});
