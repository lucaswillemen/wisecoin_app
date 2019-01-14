app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('app', {
            abstract: true,
            url: "",
            views: {
                "menu": {
                    templateUrl: "template/menu.html?" + window.version
                },
                "header": {
                    templateUrl: "template/header.html?" + window.version,
                    controller: "menu"
                },
                "root": {
                    template: ' <ng-view ui-view="view"></ng-view>',
                    controller: "Main"
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "root": {
                    templateUrl: "template/login.html?" + window.version,
                    controller: "login"
                }
            }
        })
        .state('cadastro', {
            url: "/register",
            views: {
                "root": {
                    templateUrl: "template/cadastro.html?" + window.version,
                    controller: "cadastro"
                }
            }
        })
        .state('consierge', {
            url: "/consierge/:consierge",
            views: {
                "root": {
                    templateUrl: "template/cadastro.html?" + window.version,
                    controller: "cadastro"
                }
            }
        })
        .state('securityling', {
            url: "/securityling/:token?",
            views: {
                "header": {
                    templateUrl: "template/auth_header.html?" + window.version,
                    controller: "menu"
                },
                "root": {
                    templateUrl: "template/cadastro.html?" + window.version,
                    controller: "securityling"
                }
            }
        })
        .state('app.home', {
            url: "/home",
            views: {
                "view": {
                    templateUrl: "template/home.html?" + window.version,
                    controller: "home"
                }
            }
        })
        .state('app.transaction', {
            url: "/transaction",
            views: {
                "view": {
                    templateUrl: "template/transaction.html?" + window.version,
                    controller: "transaction"
                }
            }
        })
        .state('app.consierge', {
            url: "/consierge",
            views: {
                "view": {
                    templateUrl: "template/consierge.html?" + window.version,
                    controller: "consierge"
                }
            }
        })
        .state('app.profile', {
            url: "/profile",
            views: {
                "view": {
                    templateUrl: "template/profile.html?" + window.version,
                    controller: "profile"
                }
            }
        })
        .state('app.buy', {
            url: "/buy",
            views: {
                "view": {
                    templateUrl: "template/buy.html?" + window.version,
                    controller: "buy"
                }
            }
        })
        
    $urlRouterProvider.otherwise("/login") 
    
  
})