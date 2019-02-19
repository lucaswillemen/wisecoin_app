app.controller('buy', function($scope, $rootScope, $state, $stateParams, $httpParamSerializerJQLike, $localStorage, $http, $filter) {

    $scope.url = window.api + "auth/"
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $http.get(window.api + "config/")
        .then(function(res) {
            $rootScope.config = res.data
            $scope.wise_value = 2000
            $scope.calcAmount()
        })
 
    $scope.loop = function() {
        $scope.load_user()
        setTimeout(function() {
            $scope.loop()
        }, 6000);
    };
    $scope.loop()


    $scope.calcAmount = function() {
        $scope.wise_amount = $filter('number')(parseFloat($scope.wise_value * $rootScope.config.wise_cota), 2)
    }

    $scope.$on('$viewContentLoaded', function() {
        $('#form-mp').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            var $form = $(this);
            Mercadopago.createToken($form, mpResponseHandler);
        })
    })



    Mercadopago.setPublishableKey("APP_USR-eb442675-c8c2-40dc-8276-bb331d69db5e");

    var mpResponseHandler = function(status, response) {
        console.log(response)
        $("#errorCodes").html("")
        if (status === 400) {
            angular.forEach(response.cause, function(v){
                switch(v.code){
                    case "E301": $("#errorCodes").append("<p>Invalid Card Number</p>");break;
                    case "E204": $("#errorCodes").append("<p>Invalid Month Expiration</p>");break;
                    case "E302": $("#errorCodes").append("<p>Invalid security code</p>");break;
                    case "326": $("#errorCodes").append("<p>Invalid Year Expiration</p>");break;
                    case "325": $("#errorCodes").append("<p>Invalid Month Expiration</p>");break;
                    case "316": $("#errorCodes").append("<p>Invalid card holder name</p>");break;
                }
            })
            return false;
        }
        

        $('#form-mp')[0].reset()
        $("#form-mp").data('formValidation').resetForm();
        $("#modalCard").modal('hide')
        $("#cardThumb").html("")
        $scope.$apply()
        
        var params = $.param( {
            token:response.id,
            card_id:$scope.card_flag,
            amount:$scope.wise_value,
            Authorization: $localStorage.auth.token,
            email: $localStorage.auth.email
        }, true )

        Swal({            
            title: "Are you sure?",
            text: "You are buying "+$scope.wise_value+" wisecoin for $"+$scope.wise_amount+"!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes, buy!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(window.api+"card?"+params)
                    .then(response => response.json())
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {

            Mercadopago.clearSession();
            console.log(result.value)
            if (result.value.statusCode == 401) {
                swal("Oops...", "Your purchase was not authorized.", "error");
            }else if(result.value.statusCode == 200){
                swal("Ready", "Your purchase has been approved.", "success");
            }else if(result.value.statusCode == 403){
                swal("Ready", "There was an error in the payment system, please try again later.", "warning");
            }
        })  
    }

    function getBin() {
        var ccNumber = document.querySelector('input[data-checkout="cardNumber"]');
        return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
    };

    $scope.verificarBandeira = function() {
        var bin = getBin();
        if (bin.length >= 6) {
            Mercadopago.getPaymentMethod({
                "bin": bin
            }, function(s, r) {
                $scope.card_flag = r[0].id
                $("#cardThumb").html('<img src="' + r[0].secure_thumbnail + '">')
            });
        }
    }
    $scope.copyAddress = function() {
        var copyText = document.getElementById("addressToCopy");
        $("#addressToCopy").prop('disabled', false)
        copyText.select();
        document.execCommand("copy");

        $("#addressToCopy").prop('disabled', true)
    }

})