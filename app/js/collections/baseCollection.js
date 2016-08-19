define(['backbone'], function(Backbone) {
    var BaseCollection = Backbone.Collection.extend({
        note:null,
        loading:false,
        getCollection:function(){
            return this.fetch();
        },
        sync: function(method, collection, options){
            options = options || {};
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
                if (options.removeBearer !== true) {
                    xhr.setRequestHeader('Bearer-Token', localstorage.get('token')); // This needs to be updated with the correct token
                }
            };
            return Backbone.sync.call(this,method, collection, options);
        }

    });
    return BaseCollection;
});