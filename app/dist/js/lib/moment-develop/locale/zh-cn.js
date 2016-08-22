(function(e,t){typeof exports=="object"&&typeof module!="undefined"?t(require("../moment")):typeof define=="function"&&define.amd?define(["moment"],t):t(e.moment)})(this,function(e){var t=e.defineLocale("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah点mm分",LTS:"Ah点m分s秒",L:"YYYY-MM-DD",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah点mm分",LLLL:"YYYY年MMMD日ddddAh点mm分",l:"YYYY-MM-DD",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah点mm分",llll:"YYYY年MMMD日ddddAh点mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(e,t){return e===12&&(e=0),t==="凌晨"||t==="早上"||t==="上午"?e:t==="下午"||t==="晚上"?e+12:e>=11?e:e+12},meridiem:function(e,t,n){var r=e*100+t;return r<600?"凌晨":r<900?"早上":r<1130?"上午":r<1230?"中午":r<1800?"下午":"晚上"},calendar:{sameDay:function(){return this.minutes()===0?"[今天]Ah[点整]":"[今天]LT"},nextDay:function(){return this.minutes()===0?"[明天]Ah[点整]":"[明天]LT"},lastDay:function(){return this.minutes()===0?"[昨天]Ah[点整]":"[昨天]LT"},nextWeek:function(){var t,n;return t=e().startOf("week"),n=this.unix()-t.unix()>=604800?"[下]":"[本]",this.minutes()===0?n+"dddAh点整":n+"dddAh点mm"},lastWeek:function(){var t,n;return t=e().startOf("week"),n=this.unix()<t.unix()?"[上]":"[本]",this.minutes()===0?n+"dddAh点整":n+"dddAh点mm"},sameElse:"LL"},ordinalParse:/\d{1,2}(日|月|周)/,ordinal:function(e,t){switch(t){case"d":case"D":case"DDD":return e+"日";case"M":return e+"月";case"w":case"W":return e+"周";default:return e}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},week:{dow:1,doy:4}});return t});