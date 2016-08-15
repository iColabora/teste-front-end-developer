require.config({
    baseUrl: 'js',
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'jquery.price_format': {
            deps: ['jquery']
        },
        'jqueryValidation': {
            deps: ['jquery'],
            exports: 'JqueryValidate'
        },
        'bootstrap-select': {
            deps: ['bootstrap', 'jquery']
        },
        'moment': {
            deps: ['jquery']
        },
        'jquery-mask': {
            deps: ['jquery']
        },
        'jquery-cpfcnpj': {
            deps: ['jquery']
        },
        'datetimePicker': {
            deps: ['jquery']
        }
    },
    paths: {
        'jquery': 'lib/jquery-3.1.0.min',
        'underscore': 'lib/underscore/underscore1.8.3',
        'backbone': 'lib/backbone/backbone1.2.3',
        'doT': 'lib/doT1.0.0/doT.min',
        'bootstrap': 'lib/bootstrap.min',
        'text': 'lib/text/text',
        'jquery.price_format': 'lib/jquery-price-format/jquery.price_format.min',
        'modernizr': 'lib/modernizr2.6.2/modernizr-2.6.2.min',
        'templatesFolder': '../templates',
        'bootstrap-select': 'lib/bootstrap-select.min',
        'jquery-cpfcnpj': 'lib/jQuery-CPF-CNPJ-Validator-plugin-master/jquery.cpfcnpj.min',
        'jquery-mask': 'lib/jquery.mask.min',
        'moment': 'lib/moment-develop/min/moment-with-locales.min',
        'datetimePicker': 'lib/bootstrap-datetimepicker-master/build/js/bootstrap-datetimepicker.min',
        'pnotify': 'lib/pnotify/pnotify.custom.min',
        'pnotify.buttons': 'lib/pnotify/pnotify.custom.min',
        'mysql_lib': 'lib/mysql_lib'
    },
    waitSeconds: 0
});

require(["jquery", "backbone", "router", "bootstrap", 'bootstrap-select', 'moment', 'datetimePicker', 'pnotify', 'pnotify.buttons','mysql_lib'],
        function ($, Backbone, Router) {

            router = new Router();
            PNotify.prototype.options.styling = "bootstrap3";

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        });
