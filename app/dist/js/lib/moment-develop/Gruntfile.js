module.exports=function(e){e.initConfig({pkg:e.file.readJSON("package.json"),env:{sauceLabs:e.file.exists(".sauce-labs.creds")?e.file.readJSON(".sauce-labs.creds"):{}},karma:{options:{frameworks:["qunit"],files:["min/moment-with-locales.js","min/tests.js"],sauceLabs:{startConnect:!0,testName:"MomentJS"},customLaunchers:{slChromeWinXp:{base:"SauceLabs",browserName:"chrome",platform:"Windows XP"},slIe9Win7:{base:"SauceLabs",browserName:"internet explorer",platform:"Windows 7",version:"9"},slIe8Win7:{base:"SauceLabs",browserName:"internet explorer",platform:"Windows 7",version:"8"},slFfLinux:{base:"SauceLabs",browserName:"firefox",platform:"Linux"},slSafariOsx:{base:"SauceLabs",browserName:"safari",platform:"OS X 10.8"}}},server:{browsers:[]},chrome:{singleRun:!0,browsers:["Chrome"]},firefox:{singleRun:!0,browsers:["Firefox"]},sauce:{options:{reporters:["dots"]},singleRun:!0,browsers:["slChromeWinXp","slIe9Win7","slIe8Win7","slFfLinux","slSafariOsx"]}},uglify:{main:{files:{"min/moment-with-locales.min.js":"min/moment-with-locales.js","min/locales.min.js":"min/locales.js","min/moment.min.js":"moment.js"}},options:{mangle:!0,compress:{dead_code:!1},output:{ascii_only:!0},report:"min",preserveComments:"some"}},jshint:{all:["Gruntfile.js","tasks/**.js","src/**/*.js"],options:{jshintrc:!0}},jscs:{all:["Gruntfile.js","tasks/**.js","src/**/*.js"],options:{config:".jscs.json"}},watch:{test:{files:["src/**/*.js"],tasks:["test"]},jshint:{files:"<%= jshint.all %>",tasks:["jshint"]}},benchmark:{all:{src:["benchmarks/*.js"]}},exec:{"meteor-init":{command:["type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }","mv package.js package.dojo && cp meteor/package.js ."].join(";")},"meteor-cleanup":{command:'rm -rf ".build.*" versions.json; mv package.dojo package.js'},"meteor-test":{command:"spacejam --mongo-url mongodb:// test-packages ./"},"meteor-publish":{command:"meteor publish"}}}),e.loadTasks("tasks"),require("load-grunt-tasks")(e),e.registerTask("default",["lint","test:node"]),e.registerTask("lint",["jshint","jscs"]),e.registerTask("test",["test:node"]),e.registerTask("test:node",["transpile","qtest"]),e.registerTask("test:server",["transpile","update-index","karma:server"]),e.registerTask("test:browser",["transpile","update-index","karma:chrome","karma:firefox"]),e.registerTask("test:sauce-browser",["transpile","update-index","env:sauceLabs","karma:sauce"]),e.registerTask("test:meteor",["exec:meteor-init","exec:meteor-test","exec:meteor-cleanup"]),e.registerTask("build:travis",["default"]),e.registerTask("meteor-publish",["exec:meteor-init","exec:meteor-publish","exec:meteor-cleanup"]),e.registerTask("release",["default","update-index","component","uglify:main"])};