app.controller('home', function($scope, $rootScope, $state, $http, $localStorage, $sce, $httpParamSerializerJQLike, $filter) {
    $rootScope.menu = "home"
    $rootScope.title = "Dashboard"
    $scope.url = window.api + "home/"
    $scope.load_user()
    $scope.loop = function() {
        $scope.load_user()
        setTimeout(function() {
            $scope.loop()
        }, 6000);
    };
    $scope.loop()

    $scope.toCalc = 1


    $scope.load_chart = function() {
        $http.get(window.api + "wisecoin/chart")
            .then(function(res) {
                $scope.chart = res.data

                var ctx = document.getElementById("canvas").getContext("2d");
                if ($(window).width() > 748)
                    ctx.canvas.height = 80;
                else
                    ctx.canvas.height = 180;
                var config = {
                    type: 'line',
                    data: {
                        labels: [],
                        datasets: [{
                            label: "",
                            tension: .4,
                            backgroundColor: "transparent",
                            borderColor: "#2c80ff",
                            pointBorderColor: "#2c80ff",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 2,
                            pointHoverRadius: 6,
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "#2c80ff",
                            pointHoverBorderWidth: 2,
                            pointRadius: 6,
                            pointHitRadius: 6,
                            data: []
                        }]
                    },
                    options: {
                        legend: {
                            display: !1
                        },
                        maintainAspectRatio: !1,
                        tooltips: {
                            callbacks: {
                                title: function(e, t) {
                                    return "Date : " + t.labels[e[0].index]
                                },
                                label: function(e, t) {
                                    return t.datasets[0].data[e.index] + " Tokens"
                                }
                            },
                            backgroundColor: "#eff6ff",
                            titleFontSize: 13,
                            titleFontColor: "#6783b8",
                            titleMarginBottom: 10,
                            bodyFontColor: "#9eaecf",
                            bodyFontSize: 14,
                            bodySpacing: 4,
                            yPadding: 15,
                            xPadding: 15,
                            footerMarginTop: 5,
                            displayColors: !1
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: !0,
                                    fontSize: 12,
                                    callback: function(value, index, values) {
                                        return $filter('number')(value, "4 ") + " USD"
                                    },
                                    fontColor: '#9eaecf'
                                },
                                gridLines: {
                                    color: "#e5ecf8",
                                    tickMarkLength: 0,
                                    zeroLineColor: "#e5ecf8"
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontSize: 12,
                                    fontColor: "#9eaecf",
                                    source: "auto"
                                },
                                gridLines: {
                                    color: "transparent",
                                    tickMarkLength: 20,
                                    zeroLineColor: "#e5ecf8"
                                }
                            }]
                        }
                    }

                };
                angular.forEach($scope.chart.reverse(), function(v) {
                    config.data.datasets[0].data.push(v.cota)
                    config.data.labels.push(moment(v.data).format("DD/MM"))
                })

                $scope.myLine = new Chart(ctx, config);
            })
    };
    $scope.load_chart()





})