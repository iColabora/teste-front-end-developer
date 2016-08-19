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
        'jquery.validate': {
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
        },
        'jqueryStorage': {
            deps: ['jquery'],
            exports: 'Storage'
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
        'jquery.validate': 'lib/jquery-validation1.12.0/dist/jquery.validate.min',
        'modernizr': 'lib/modernizr2.6.2/modernizr-2.6.2.min',
        'templatesFolder': '../templates',
        'bootstrap-select': 'lib/bootstrap-select.min',
        'jquery-cpfcnpj': 'lib/jQuery-CPF-CNPJ-Validator-plugin-master/jquery.cpfcnpj.min',
        'jquery-mask': 'lib/jquery.mask.min',
        'jqueryStorage': 'lib/jquery-storage1.7.2/jquery.storageapi.min',
        'moment': 'lib/moment-develop/min/moment-with-locales.min',
        'datetimePicker': 'lib/bootstrap-datetimepicker-master/build/js/bootstrap-datetimepicker.min',
        'pnotify': 'lib/pnotify/pnotify.custom.min',
        'pnotify.buttons': 'lib/pnotify/pnotify.custom.min',
        'mysql_lib': 'lib/mysql_lib'
    },
    waitSeconds: 0
});

require(["jquery", "backbone", "router", "bootstrap", 'bootstrap-select', 'moment', 'datetimePicker', 'pnotify', 'pnotify.buttons',"jqueryStorage"],
        function ($, Backbone, Router) {

            //Create namespace and instance for localstorage
            ns = $.initNamespaceStorage('teste-icolabora');
            localstorage = ns.localStorage;

            router = new Router();
            PNotify.prototype.options.styling = "bootstrap3";

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        });
