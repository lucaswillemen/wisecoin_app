app.controller('consierge', function($scope, $rootScope, $state, $stateParams, $httpParamSerializerJQLike, $localStorage, $http) {

	$scope.url = window.api+"auth/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $localStorage.consierge = $stateParams.consierge
    
    $scope.load_user()
    $scope.loop = function(){
        $scope.load_user()

        setTimeout(function() {$scope.loop()}, 6000);
    };$scope.loop()

    $http.get(window.api + "consierge/")
        .then(function(res) {
            $scope.bonus = res.data


            
        })
    
})