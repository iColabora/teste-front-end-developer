/* doT + auto-compilation of doT templates
 *
 * 2012, Laura Doktorova, https://github.com/olado/doT
 * Licensed under the MIT license
 *
 * Compiles .def, .dot, .jst files found under the specified path.
 * It ignores sub-directories.
 * Template files can have multiple extensions at the same time.
 * Files with .def extension can be included in other files via {{#def.name}}
 * Files with .dot extension are compiled into functions with the same name and
 * can be accessed as renderer.filename
 * Files with .jst extension are compiled into .js files. Produced .js file can be
 * loaded as a commonJS, AMD module, or just installed into a global variable
 * (default is set to window.render).
 * All inline defines defined in the .jst file are
 * compiled into separate functions and are available via _render.filename.definename
 *
 * Basic usage:
 * var dots = require("dot").process({path: "./views"});
 * dots.mytemplate({foo:"hello world"});
 *
 * The above snippet will:
 * 1. Compile all templates in views folder (.dot, .def, .jst)
 * 2. Place .js files compiled from .jst templates into the same folder.
 *    These files can be used with require, i.e. require("./views/mytemplate").
 * 3. Return an object with functions compiled from .dot templates as its properties.
 * 4. Render mytemplate template.
 */

function InstallDots(e){this.__path=e.path||"./",this.__path[this.__path.length-1]!=="/"&&(this.__path+="/"),this.__destination=e.destination||this.__path,this.__destination[this.__destination.length-1]!=="/"&&(this.__destination+="/"),this.__global=e.global||"window.render",this.__rendermodule=e.rendermodule||{},this.__settings=e.templateSettings?copy(e.templateSettings,copy(doT.templateSettings)):undefined,this.__includes={}}function addexports(e){for(var t="",n=0;n<e.length;n++)t+="itself."+e[n]+"="+e[n]+";";return t}function copy(e,t){t=t||{};for(var n in e)t[n]=e[n];return t}function readdata(e){var t=fs.readFileSync(e);if(t)return t.toString();console.log("problems with "+e)}var fs=require("fs"),doT=module.exports=require("./doT");doT.process=function(e){return(new InstallDots(e)).compileAll()},InstallDots.prototype.compileToFile=function(e,t,n){n=n||{};var r=e.substring(e.lastIndexOf("/")+1,e.lastIndexOf(".")),i=copy(this.__includes,copy(n)),s=this.__settings||doT.templateSettings,o=copy(s),u=doT.template(t,s,i),a=[],f="",l;for(var c in i)i[c]!==n[c]&&i[c]!==this.__includes[c]&&(l=undefined,typeof i[c]=="string"?l=doT.template(i[c],s,i):typeof i[c]=="function"?l=i[c]:i[c].arg&&(o.varname=i[c].arg,l=doT.template(i[c].text,o,i)),l&&(f+=l.toString().replace("anonymous",c),a.push(c)));f+=u.toString().replace("anonymous",r),fs.writeFileSync(e,"(function(){"+f+"var itself="+r+";"+addexports(a)+"if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {"+this.__global+"="+this.__global+"||{};"+this.__global+"['"+r+"']=itself;}}());")},InstallDots.prototype.compilePath=function(e){var t=readdata(e);if(t)return doT.template(t,this.__settings||doT.templateSettings,copy(this.__includes))},InstallDots.prototype.compileAll=function(){console.log("Compiling all doT templates...");var e=this.__path,t=fs.readdirSync(e),n,r,i;for(n=0,r=t.length;n<r;n++)i=t[n],/\.def(\.dot|\.jst)?$/.test(i)&&(console.log("Loaded def "+i),this.__includes[i.substring(0,i.indexOf("."))]=readdata(e+i));for(n=0,r=t.length;n<r;n++)i=t[n],/\.dot(\.def|\.jst)?$/.test(i)&&(console.log("Compiling "+i+" to function"),this.__rendermodule[i.substring(0,i.indexOf("."))]=this.compilePath(e+i)),/\.jst(\.dot|\.def)?$/.test(i)&&(console.log("Compiling "+i+" to file"),this.compileToFile(this.__destination+i.substring(0,i.indexOf("."))+".js",readdata(e+i)));return this.__rendermodule};