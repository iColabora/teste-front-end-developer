define(['backbone', 'doT'], function (Backbone, doT) {
    var BaseView = Backbone.View.extend({

        notification_wait: function () {
            var notice = new PNotify({
                text: "Por favor aguarde...",
                type: 'info',
                icon: 'fa fa-spinner fa-pulse fa-fw',
                hide: false,
                buttons: {
                    closer: false,
                    sticker: false
                }
            });
            $('body').addClass('window-disable');
            return notice;
        },
        notification_done: function (notice) {
            var options = {
                title: "Feito!",
                type: "success",
                text: "",
                hide: true,
                buttons: {
                    closer: true,
                    sticker: true
                },
                icon: 'fa fa-check'
            };
            $('body').removeClass('window-disable');
            notice.update(options);
        },
        initialize: function (options) {
            //only to build the method afterRender

            _.bindAll(this, 'render');
        },
        fetch: function (arg) {
            options = arg;
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
            };

            //Call Backbone's fetch
            return Backbone.Model.prototype.fetch.call(this, options);
        }
    });
    return BaseView;
});
