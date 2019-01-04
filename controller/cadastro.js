app.controller('cadastro', function($scope, $rootScope, $state, $stateParams, $httpParamSerializerJQLike, $localStorage, $http) {

	$scope.url = window.api+"auth/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $scope.data = {
        consierge: $stateParams.consierge
    }


	console.log($localStorage.auth)
    $scope.$on('$viewContentLoaded', function() {

        setTimeout(function() {
            $(".loading").fadeOut()
        }, 1000);
    	setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 200)
		$('#FormCadastro').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            $http.post($scope.url+"register",$httpParamSerializerJQLike($scope.data))
            .then(function(res){
            	$localStorage.auth = res.data
            	$state.go("app.home")
            },function(res){
                
                switch(res.status){
                    case 400:
                    swal("Oops...", "This email is already registered!", "error");
                    break;
                    case 402:
                    swal("Oops...", "This user is already registered!", "error");
                    break;
                    case 403:
                    swal("Oops...", "Consierge not found!", "warning");
                    break;

                }
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