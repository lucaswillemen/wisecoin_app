app.controller('menu', function($scope, $rootScope, $state, $http) {


/*! The Final Countdown for jQuery v2.2.0 ( http://hilios.github.io/jQuery.countdown/ )*/
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){var b=a.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(b)}function d(a){return function(b){var d=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(d)for(var f=0,g=d.length;f<g;++f){var h=d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),j=c(h[0]),k=h[1]||"",l=h[3]||"",m=null;h=h[2],i.hasOwnProperty(h)&&(m=i[h],m=Number(a[m])),null!==m&&("!"===k&&(m=e(l,m)),""===k&&m<10&&(m="0"+m.toString()),b=b.replace(j,m.toString()))}return b=b.replace(/%%/,"%")}}function e(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),Math.abs(b)>1?c:d}var f=[],g=[],h={precision:100,elapse:!1,defer:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var i={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},j=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.options=a.extend({},h),this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&("function"==typeof d?(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)):this.options=a.extend({},h,d)),this.setFinalDate(c),this.options.defer===!1&&this.start()};a.extend(j.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var b,c=void 0!==a._data(this.el,"events"),d=new Date;b=this.finalDate.getTime()-d.getTime(),b=Math.ceil(b/1e3),b=!this.options.elapse&&b<0?0:Math.abs(b),this.totalSecsLeft!==b&&c&&(this.totalSecsLeft=b,this.elapsed=d>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-d.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish")))},dispatchEvent:function(b){var c=a.Event(b+".countdown");c.finalDate=this.finalDate,c.elapsed=this.elapsed,c.offset=a.extend({},this.offset),c.strftime=d(this.offset),this.$el.trigger(c)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];j.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new j(this,b[0],b[1])})}});


 ! function(e) {
     "use strict";
     var t = e(window),
         a = e("body"),
         o = e(document);

     function i() {
         return t.width()
     }
     "ontouchstart" in document.documentElement || a.addClass("no-touch");
     var n = i();
     t.on("resize", function() {
         n = i()
     });
     var l = e(".is-sticky"),
         r = e(".topbar"),
         s = e(".topbar-wrap");
     if (l.length > 0) {
         var c = l.offset();
         t.scroll(function() {
             var e = t.scrollTop(),
                 a = r.height();
             e > c.top ? l.hasClass("has-fixed") || (l.addClass("has-fixed"), s.css("padding-top", a)) : l.hasClass("has-fixed") && (l.removeClass("has-fixed"), s.css("padding-top", 0))
         })
     }
     var p = window.location.href,
         g = p.split("#"),
         h = e("a");
     h.length > 0 && h.each(function() {
         p === this.href && "" !== g[1] && e(this).closest("li").addClass("active").parent().closest("li").addClass("active")
     });
     var f = e(".countdown-clock");
     f.length > 0 && f.each(function() {
         var t = e(this),
             a = t.attr("data-date");
         t.countdown(a).on("update.countdown", function(t) {
             e(this).html(t.strftime('<div><span class="countdown-time countdown-time-first">%D</span><span class="countdown-text">Day</span></div><div><span class="countdown-time">%H</span><span class="countdown-text">Hour</span></div><div><span class="countdown-time">%M</span><span class="countdown-text">Min</span></div><div><span class="countdown-time countdown-time-last">%S</span><span class="countdown-text">Sec</span></div>'))
         })
     });
     var u = e(".select");
     u.length > 0 && u.each(function() {
         e(this).select2({
             theme: "flat"
         })
     });
     var v = e(".select-bordered");
     v.length > 0 && v.each(function() {
         e(this).select2({
             theme: "flat bordered"
         })
     });
     var m = ".toggle-tigger",
         b = ".toggle-class";
     e(m).length > 0 && o.on("click", m, function(t) {
         var a = e(this);
         e(m).not(a).removeClass("active"), e(b).not(a.parent().children()).removeClass("active"), a.toggleClass("active").parent().find(b).toggleClass("active"), t.preventDefault()
     }), o.on("click", "body", function(t) {
         var a = e(m),
             o = e(b);
         o.is(t.target) || 0 !== o.has(t.target).length || a.is(t.target) || 0 !== a.has(t.target).length || (o.removeClass("active"), a.removeClass("active"))
     });
     var y = e(".toggle-nav"),
         x = e(".navbar");

     function C(e) {
         n < 991 ? e.delay(500).addClass("navbar-mobile") : e.delay(500).removeClass("navbar-mobile")
     }
     y.length > 0 && y.on("click", function(e) {
         y.toggleClass("active"), x.toggleClass("active"), e.preventDefault()
     }), o.on("click", "body", function(e) {
         y.is(e.target) || 0 !== y.has(e.target).length || x.is(e.target) || 0 !== x.has(e.target).length || (y.removeClass("active"), x.removeClass("active"))
     }), C(x), t.on("resize", function() {
         C(x)
     });
     var k = e('[data-toggle="tooltip"]');
     k.length > 0 && k.tooltip();
     var w = e(".color-trigger");
     w.length > 0 && w.on("click", function() {
         var t = e(this).attr("title");
         return e("body").fadeOut(function() {
             e("#layoutstyle").attr("href", "assets/css/" + t + ".css"), e(this).delay(150).fadeIn()
         }), !1
     });
 }(jQuery);
})