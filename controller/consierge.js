app.controller('consierge', function($scope, $rootScope, $state, $stateParams, $httpParamSerializerJQLike, $localStorage, $http) {

	$scope.url = window.api+"auth/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $localStorage.consierge = $stateParams.consierge
    
    $scope.load_user()
    $scope.loop = function(){
        $scope.load_user()

        setTimeout(function() {$scope.loop()}, 6000);
    };$scope.loop()

    $scope.load_bonus = function(){
        $http.get(window.api + "consierge/")
            .then(function(res) {
                $scope.bonus = res.data            
            })        
    }; $scope.load_bonus()

    $scope.redeem = function(){
        $http.post(window.api + "consierge/redeem")
        .then(function(res){
            console.log(res.data)
            $scope.load_user()
            $scope.load_bonus()
            swal("Ready", "You rescued "+res.data+" wisecoin.", "success");
        })
    }
    $scope.copyAddress = function() {
    var copyText = document.getElementById("addressToCopy");
    $("#addressToCopy").prop('disabled', false)
    copyText.select();
    document.execCommand("copy");

    $("#addressToCopy").prop('disabled', true)
}
})