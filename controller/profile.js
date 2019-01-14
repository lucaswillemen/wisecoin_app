app.controller('profile', function($scope, $rootScope, $state, $stateParams, $httpParamSerializerJQLike, $localStorage, $http) {

    $scope.url = window.api + "auth/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $localStorage.consierge = $stateParams.consierge
    $scope.load_user()
    $scope.profile = {
        fullname: $rootScope.user_data.fullname,
        nome: $rootScope.user_data.nome,
        email: $rootScope.user_data.email,
        corretor: $rootScope.user_data.corretor
    }


    // $scope.load_user()
    $scope.data_setting = {
        corretor: $rootScope.user_data.corretor,
        bonus_btc: $rootScope.user_data.bonus_btc
    }
    $scope.update_consierge = function() {
        $http.post(window.api + "setting/consierge", $httpParamSerializerJQLike($scope.data_setting))
            .then(function(res) {
                if ($scope.data_setting.corretor) {
                    swal("Ready", "Your consierge menu has been activated!", "success")
                } else {
                    swal("Ready", "Your consierge menu has been desactivated!", "warning")
                }
                $scope.load_user()
            }, function() {
                swal("Oops...", "You must have bought more than 10,000 Wisecoin to work as a consierge!", "warning");
                $scope.data_setting.corretor = 0
            })
    }
    $scope.update_bonus = function() {
        $http.post(window.api + "setting/bonus", $httpParamSerializerJQLike($scope.data_setting))
            .then(function(res) {

                if ($scope.data_setting.bonus_btc) {
                    swal("Ready", "You will receive a 20% bonus on Wisecoin!", "success")
                } else {
                    swal("Ready", "You will receive 10% bonus in Wisecoin and 10% in Bitcoin!", "warning")
                }
                $scope.load_user()
            })
    }

    $scope.$on('$viewContentLoaded', function() {


        $('#FormProfile').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            $http.post($scope.url + "update", $httpParamSerializerJQLike($scope.profile))
                .then(function(res) {
                    swal("Ready", "Your profile has been updated!", "success");
                    $scope.load_user()
                }, function(res) {

                    switch (res.status) {
                        case 400:
                            swal("Oops...", "This email is already registered!", "error");
                            break;
                        case 402:
                            swal("Oops...", "This user is already registered!", "error");
                            break;
                        case 403:
                            swal("Oops...", "This email already exists!", "warning");
                            break;

                    }
                })
        })
    })
    $scope.copyAddress = function() {
        var copyText = document.getElementById("addressToCopy");
        $("#addressToCopy").prop('disabled', false)
        copyText.select();
        document.execCommand("copy");

        $("#addressToCopy").prop('disabled', true)
    }

})