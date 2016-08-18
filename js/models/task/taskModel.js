define(['backbone', 'models/baseModel'], function (Backbone, BaseModel) {
    var taskModel = BaseModel.extend({
        salvarPedido: function(data) {

        },
        parse: function (response) {
            return response.result;
        }
    });

    return taskModel;
});