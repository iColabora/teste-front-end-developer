var Benchmark=require("benchmark");module.exports={name:"zeroFill",tests:{zeroFillMath:{setup:function(){var e=function(e,t,n){var r=""+Math.abs(e),i=t-r.length,s=e>=0;return(s?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+r}},fn:function(){zeroFillMath(Math.random()*1e5|0,5),zeroFillMath(Math.random()*1e5|0,10),zeroFillMath(Math.random()*1e10|0,20)},async:!0},zeroFillWhile:{setup:function(){var e=function(e,t,n){var r=""+Math.abs(e),i=e>=0;while(r.length<t)r="0"+r;return(i?n?"+":"":"-")+r}},fn:function(){zeroFillWhile(Math.random()*1e5|0,5),zeroFillWhile(Math.random()*1e5|0,10),zeroFillWhile(Math.random()*1e10|0,20)},async:!0}}};