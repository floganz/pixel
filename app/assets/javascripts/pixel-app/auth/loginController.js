angular.module('pixel-app').controller('loginController', ['Auth', '$scope',
	function (Auth, $scope) {

    var vm = this;

    this.sign_in = function (data) {
      console.log(data);
      Auth.login(data,{
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
      });
    };

    this.sign_up = function (data) {
      console.log(data);
      Auth.register(data,{
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        });
    };
	}
]);
