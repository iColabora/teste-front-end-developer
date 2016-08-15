define(['backbone', 'models/baseModel'], function (Backbone, BaseModel) {
    var taskModel = BaseModel.extend({
        parse: function (response) {
            return response.result;
        }
    });

    return taskModel;
});