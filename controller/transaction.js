app.controller('transaction', function($scope, $rootScope, $state, $stateParams, $httpParamSerializerJQLike, $localStorage, $http) {

    $scope.url = window.api + "wallet/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $localStorage.consierge = $stateParams.consierge
    
    $http.get($scope.url + "transactions")
    .then(function(res) {
        console.log(res.data)
        $scope.transactions = res.data
        
    })

})