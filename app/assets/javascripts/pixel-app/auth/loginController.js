angular.module('pixel-app').controller('loginController', ['Auth', '$scope',
	function (Auth, $scope) {

		var vm = this;
    vm.scope = $scope;
    //vm.opened = opened;
    console.log("get here");
    
    this.onSubmit = function (data) {
      console.log(data);
      Auth.login(data,{
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        });
    };

    this.cancel = function () {
      vm.uni.show = false;
    	vm.onCancel();
    };
	}
]);
