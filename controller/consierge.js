app.controller('consierge', function($scope, $rootScope, $state, $stateParams, $httpParamSerializerJQLike, $localStorage, $http) {

	$scope.url = window.api+"auth/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $localStorage.consierge = $stateParams.consierge
    console.log($stateParams.consierge)
    
})