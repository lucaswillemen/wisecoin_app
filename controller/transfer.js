app.controller('transfer', function($scope, $rootScope, $state, $stateParams, $httpParamSerializerJQLike, $localStorage, $http, $filter) {

    $scope.url = window.api + "transfer/"



     $scope.$on('$viewContentLoaded', function() {
        $('#formTransfer').formValidation().on('success.form.fv', function(e) {
            e.preventDefault();
            $http.post($scope.url+"send",$httpParamSerializerJQLike($scope.transfer))
            .then(function(res){

                $("#modalTransfer").modal("hide")
                $('#formTransfer')[0].reset()
                $("#formTransfer").data('formValidation').resetForm();
                    swal("Ready", "You have sent "+res.data.amount+" WSC to  "+res.data.address+"!", "success");
            }, function(res){
                switch (res.status){
                    case 402:
                    swal("Oops...", "Failed to decrypt wallet!", "error");
                    break;
                    case 403:
                    swal("Oops...", "You do not have a balance!", "error");
                    break;
                    case 400:
                    swal("Oops...", "Invalid address!", "warning");
                    break;
                }
                
            }) 
        })
    })

})