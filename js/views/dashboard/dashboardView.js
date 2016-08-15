define([
    'doT'
            , 'views/baseView'
            , 'text!templatesFolder/dashboard/dashboard.html'
            , 'text!templatesFolder/header/header.html'
]
        , function (doT, BaseView, DashboardTemplate, HeaderTemplate) {

            var DashboardView = BaseView.extend({
                el: '#main-wrapper',
                template: doT.template(DashboardTemplate),
                headerTemplate: doT.template(HeaderTemplate),
                events: {
                },
                initialize: function (options) {
                    BaseView.prototype.initialize.call(this, options); // calling super.initializeMethod()

                },
                render: function () {

                    BaseView.prototype.render.call(this);

                    this.$el.html(this.headerTemplate({}));
                    $('.navbar-custom .navbar-nav li.dashboard').addClass('active');
                    $('.actionbar ul.dashboard').removeClass('hidden');
                },
                close: function () {
                    this.$el.empty().off();
                }

            });

            return DashboardView;

        });
