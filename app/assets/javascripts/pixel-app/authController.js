angular.module('pixel-app')
.controller('authController', ['Auth', '$scope','$location', function(Auth,$scope,$location) {

    var vm = this;
    vm.logged = false;
    vm.host = $location.protocol() + "://" + $location.host() + ":" + $location.port()
    console.log(vm.host)

    var credentials = {
        email: 'test@mail.ru',
        password: '123123'
    };
    var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };
    console.log(Auth.isAuthenticated()); // => false

    this.tab = function(path) {
      $location.path(path);
    }

    this.logout = function() {
      Auth.logout(config).then(function() {
            console.log("logout success");
        }, function(error) {
            console.log("logout failed");
        });
    }

    Auth.login(credentials, config).then(function(user) {
        Auth.currentUser().then(function(resp){
            console.log(resp)
        })
        console.log(user); // => {id: 1, ect: '...'}
    }, function(error) {
        // Authentication failed...
    });

    $scope.$on("$locationChangeStart", function(event, next, current) {

        if (!Auth.isAuthenticated()) {
            vm.logged = false;
            var str = next.slice(vm.host.length);
            if ( str != '/#/auth/sign_in' && str != '/#/auth/sign_up') {
                $location.path('/auth/sign_in')
            }
        } else {
            vm.logged = true;
        }
    });

    $scope.$on('devise:login', function(event, currentUser) {
        // after a login, a hard refresh, a new tab
        console.log("auth complited");
        vm.logged = true;
        $location.path('dashboard')
    });

    $scope.$on('devise:logout', function(event, oldCurrentUser) {
        // ...
        console.log("logout complited");
        vm.logged = false;
        $location.path('auth/sign_in')
    });
}])