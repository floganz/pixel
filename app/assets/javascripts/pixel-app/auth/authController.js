angular.module('pixel-app')
.controller('authController', ['Auth', '$scope','$location','$cookies', 
  function(Auth,$scope,$location,$cookies) {

    var vm = this;
    vm.scope = $scope;
    vm.logged = false;
    vm.host = $location.protocol() + "://" + $location.host();
    // + ":" + $location.port();
    vm.activated = false;
    vm.error = "";

    vm.sign_in = function (data) {
      vm.activated = true;
      vm.error = "";
      Auth.login(data,{
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
      }).then(function(user) {
        vm.activated = false;
      }, function(error) {
        vm.activated = false;
        vm.error = error.data.error;

      });
    };

    vm.sign_up = function (data) {
      vm.error = ""
      Auth.register(data,{
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
      }).then(function(user) {
        vm.activated = false;
      }, function(error) {
        vm.activated = false;
        vm.error = "Email " + error.data.errors.email[0];
      });
    };

    vm.tab = function(path) {
      // console.log(vm.host + " " + path);
      $location.path(path);
    }

    vm.logout = function() {
      Auth.logout().then(function() {
            // console.log("logout success");
        }, function(error) {
            // console.log("logout failed");
        });
    }

    vm.scope.$on("$locationChangeStart", function(event, next, current) {
        //console.log(next);
        //console.log(current);
        var token = $cookies.get('_pixel-app-session');
        if (!Auth.isAuthenticated()) {
            if (token) {
                Auth.login("").then(function () {
                    return
                });
            }
            vm.logged = false;
            var str = next.slice(vm.host.length);
            if ( str != '/#/auth/sign_in' && str != '/#/auth/sign_up') {
                $location.path('/auth/sign_in')
            }
        } else {
            vm.logged = true;
            // console.log(next);
            // $location.path(next);
        }
        vm.error = "";
    });

    vm.scope.$on('devise:login', function(event, currentUser) {
        vm.logged = true;
        $cookies.put('_pixel-app-session',"true");
        $location.path('dashboard');
    });

    vm.scope.$on('devise:new-registration', function(event, currentUser) {
        vm.logged = true;
        $cookies.put('_pixel-app-session',"true");
        $location.path('new_campaign');
    });

    vm.scope.$on('devise:logout', function(event, oldCurrentUser) {
        vm.logged = false;
        $cookies.remove('_pixel-app-session');
        $location.path('auth/sign_in');
    });
}])