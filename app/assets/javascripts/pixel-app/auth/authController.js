angular.module('pixel-app')
.controller('authController', ['Auth', '$scope','$location','$cookies','$state',
  function(Auth,$scope,$location,$cookies,$state) {

    var vm = this;
    vm.scope = $scope;
    vm.logged = false;
    vm.activated = false;
    vm.error = "";
    vm.next = {};

    vm.sign_in = function (data) {
      vm.activated = true;
      vm.error = "";
      Auth.login(data,{
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
      }).catch(function(error) {
        vm.error = error.data.error;
      }).finally(function() {
        vm.activated = false;
      });
    };

    vm.sign_up = function (data) {
      vm.error = "";
      Auth.register(data,{
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
      }).catch(function(error) {
        vm.error = "Email " + error.data.errors.email[0];
      }).finally(function() {
        vm.activated = false;
      });
    };

    vm.tab = function(path) {
      $location.path(path);
    }

    vm.logout = function() {
      Auth.logout().then(function() {
            // console.log("logout success");
        }, function(error) {
            // console.log("logout failed");
        });
    }

    vm.scope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        // console.log(event);
        // console.log(toState);
        // console.log(toParams);
        // console.log(fromState);
        // console.log(fromParams);
        var token = $cookies.get('_pixel-app-session');
        if (token) {
            if (vm.next.url == "") {
                vm.next = toState;
            }
            if (!Auth.isAuthenticated()) {
                Auth.login("").then(function () {
                    return
                });
            }
        } else {
            var str = toState.url;
            if ( str != '/auth/sign_in' && str != '/auth/sign_up') {
                $location.path('/auth/sign_in');
            }
        }
        vm.error = "";
    });

    vm.scope.$on('devise:login', function(event, currentUser) {
        vm.logged = true;
        $cookies.put('_pixel-app-session',Auth._currentUser.id);
        if(vm.next.url != "") {
            $state.go(vm.next);
            vm.next = {};
        } else {
            $location.path('dashboard');
        }
    });

    vm.scope.$on('devise:new-registration', function(event, currentUser) {
        vm.logged = true;
        $cookies.put('_pixel-app-session',Auth._currentUser.id);
        $location.path('new_campaign');
    });

    vm.scope.$on('devise:logout', function(event, oldCurrentUser) {
        vm.logged = false;
        $cookies.remove('_pixel-app-session');
        $location.path('auth/sign_in');
    });
}])