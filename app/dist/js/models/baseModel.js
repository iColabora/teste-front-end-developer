define(["backbone","mysql_lib"],function(e){var t=e.Model.extend({note:null,success:function(e,t){alert(t)},add:function(e){return this.url=this.url+"/add",this.save(null,e)},"delete":function(e){return this.url=this.url+"/delete",this.save(null,e)},edit:function(e){return this.url=this.url+"/edit",b=this.save(null,e),b},sync:function(t,n,r){return r=r||{},r.beforeSend=function(e){e.setRequestHeader("Accept","application/json"),e.setRequestHeader("Content-Type","application/json")},e.sync.call(this,t,n,r)}});return t});