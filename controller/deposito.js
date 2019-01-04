app.controller('deposito', function($scope, $rootScope, $state, $http, $localStorage, $sce, $httpParamSerializerJQLike, $filter) {
    $rootScope.menu = "deposito"
    $rootScope.title = "Bitcoin deposit"
    $scope.url = window.api + "deposito/"
    $scope.load_user()
    CheckInputs()
$scope.copyAddress = function() {
    var copyText = document.getElementById("addressToCopy");
    $("#addressToCopy").prop('disabled', false)
    copyText.select();
    document.execCommand("copy");

    $("#addressToCopy").prop('disabled', true)
}
    $scope.getAddress = function() {
        $http.get(window.api + "deposito/btc")
            .then(function(res) {
                console.log(res.data)
            })
    }
    $scope.getAddress()
    var dt = $("#datatable").DataTable({
        responsive: true,
        'ajax': {
            'url': $scope.url + 'btc',
            'type': 'GET',
            "dataSrc": "",
            'beforeSend': function(request) {
                request.setRequestHeader("Authorization", $localStorage.auth.token)
            }
        },
        rowId: 'staffId',
        "columns": [{
                "data": "data"
            },
            {
                "data": "address"
            },
            {
                "data": "btc"
            },
            {
                render: function(d, l, u) {
                    if (u.btc == "0.00000000" && u.unconfirmed == "0.00000000") {
                        return "<button class='btn btn-sm btn-warning'>Waiting deposit</button>"
                    }
                    if (u.btc != "0.00000000" && u.unconfirmed == "0.00000000") {
                        return "<button class='btn btn-sm btn-success'>Deposit confirmed</button>"
                    }
                    if (u.btc = "0.00000000" && u.unconfirmed != "0.00000000") {
                        return "<button class='btn btn-sm btn-primary'>waiting confirmation " + u.unconfirmed + "</button>"
                    }
                }
            }
        ],
        "order": [[ 0, "desc" ]]
    })
    setInterval(function() {
        dt.ajax.reload(null, false); // user paging is not reset on reload
    }, 10000);




    $scope.cnf = {
        createAddress: $sce.trustAsHtml('Understood, generate an address')
    }
    $('#modalBTC')
    .on('shown.bs.modal', function() {
        console.log("show")
    })
    .on('hide.bs.modal', function() {
        console.log("hide")
        delete $scope.user_data.address
        $scope.cnf = {
            createAddress: $sce.trustAsHtml('Understood, generate an address')
        }
        $scope.$apply()
    })



    $scope.getAddress = function() {
        $scope.cnf.createAddress = $sce.trustAsHtml('<i class="fa fa-circle-o-notch fa-spin"></i>')
        $http.get(window.api + "bitcoin/create")
            .then(function(res) {
                $scope.user_data.address = res.data
                dt.ajax.reload(null, false); // user paging is not reset on reload
            })
    }
})