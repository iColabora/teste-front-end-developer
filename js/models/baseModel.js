define(['backbone'], function(Backbone) {
	var BaseModel = Backbone.Model.extend({
        note:null,
        success:function(model,response){
            alert(response);
        },
        add:function(options){
            this.url = this.url+'/add';
            return this.save(null,options);
        },
        delete:function(options){
            this.url = this.url+'/delete';
            return this.save(null,options);
        },
        edit:function(options){
            this.url = this.url+'/edit';
            b =  this.save(null,options);
            return b;
        },
        sync: function(method, collection, options){
            options = options || {};
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
                if ((options.removeBearer !== true))
                    if (typeof localstorage !=='undefined')
                        if ( localstorage.get('token')!=undefined)
                            xhr.setRequestHeader('Bearer-Token', localstorage.get('token')); // This needs to be updated with the correct token

            };
            return Backbone.sync.call(this,method, collection, options);
        }
	});
	return BaseModel;
});