app.controller('login', function($scope, $rootScope, $state, $httpParamSerializerJQLike, $localStorage, $http) {
	

	$scope.url = window.api+"auth/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    if ($localStorage.auth) {
        $state.go("app.home")
    }

	
    $scope.$on('$viewContentLoaded', function() {
        $('#FormLogin').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            $http.post($scope.url+"login",$httpParamSerializerJQLike($scope.data))
            .then(function(res){
                $localStorage.auth = res.data
                $state.go("app.home")
            }, function(){
                swal("Oops...", "Failed to decrypt wallet!", "error");
            })            
        })
    })
    $scope.fb_login = function(){
        FB.login(function(response) {
            console.log(response)
            if (response.status === "connected") {
                console.log(response.authResponse.accessToken)
                var token = {token:response.authResponse.accessToken}
                $http.post('api/auth/facebook',$httpParamSerializerJQLike(token))
                .then(function(res){
                    $localStorage.auth = res.data
                    $state.go("app.home")
                }, function(){
                    swal("Oops...", "Failed to decrypt wallet!", "error");
                })  

            }else{
                swal("Oops...", "You need to allow facebook access!", "error");
            }
        }, {scope: 'email'})        
    }
    
})