window.mobile = 1
if (window.mobile) {
    window.api = "https://coin.wiseminner.com/api/"
}else{
    window.api = "api/"
}
window.version = 0.2
var app = angular.module('App', ['ui.router', 'ngStorage']);

//App principal
app.controller('Main', function($scope, $rootScope, $state, $localStorage, $http, $sce) {
  
    setTimeout(function() {
        $(".loading").fadeOut()
    }, 1000);


	$rootScope.logout = function(){
		localStorage.clear()
		location.href = "login"
	}



    $rootScope.starttemp = function(){
      var d = $("[data-percent]");
         d.length > 0 && d.each(function() {
             var t = $(this),
                 a = t.data("percent");
             t.css("width", a + "%")
         });
         
         var f = $(".countdown-clock");
         f.length > 0 && f.each(function() {
             var t = $(this),
                 a = t.attr("data-date");
             t.countdown(a).on("update.countdown", function(t) {
                 $(this).html(t.strftime('<div><span class="countdown-time countdown-time-first">%D</span><span class="countdown-text">Day</span></div><div><span class="countdown-time">%H</span><span class="countdown-text">Hour</span></div><div><span class="countdown-time">%M</span><span class="countdown-text">Min</span></div><div><span class="countdown-time countdown-time-last">%S</span><span class="countdown-text">Sec</span></div>'))
             })
         });
    }
    $rootScope.load_user = function() {
    $http.get(window.api + "home/")
        .then(function(res) {
            $rootScope.cont = 0
            $localStorage.auth = res.data
            $rootScope.user_data = $localStorage.auth
            angular.forEach(res.data.transactions, function(k,v){
                $rootScope.cont += k.wsc*k.cota
            })
            console.log($rootScope.cont)
            $rootScope.starttemp()


            
        })
    };

    
    if (!$localStorage.auth) {
        $rootScope.logout()
    }else{
        $http.defaults.headers.common.Authorization  = $localStorage.auth.token;
        $http.defaults.headers.post.Authorization = $localStorage.auth.token;
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        $rootScope.user_data = $localStorage.auth

    }

    $rootScope.Startconfig = function() {
    $http.get(window.api + "config/")
        .then(function(res) {
            $rootScope.config = res.data
        })
    };
    $scope.Startconfig()

})



app.service('authInterceptor', function($q, $rootScope) {
    this.responseError = function(response) {
        if (response.status == 401){
            $rootScope.logout();
        }
        return $q.reject(response);
    };
})
app.config(['$httpProvider', function($httpProvider, $rootScope) {
    $httpProvider.interceptors.push('authInterceptor');
}])
app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self', 'coin.wiseminner.com'
  ]);
  $sceDelegateProvider.resourceUrlBlacklist();
});